#!/usr/bin/env bash
# Offline check for skills/ingest/scripts/fetch_transcript.sh: a fake yt-dlp serves canned JSON.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
script="$here/../skills/ingest/scripts/fetch_transcript.sh"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

mkdir "$work/bin"
cat > "$work/bin/yt-dlp" <<'EOF'
#!/usr/bin/env bash
# -J prints the canned info; a subtitle download writes the canned json3 and logs the track
if [[ " $* " == *" -J "* ]]; then cat "$FAKE_INFO"; exit; fi
while [ $# -gt 0 ]; do
  case "$1" in --sub-langs) track="${2#^}" track="${track%\$}"; shift ;; -o) out="$2"; shift ;; esac
  shift
done
echo "$track" > "$FAKE_LOG"
cp "$FAKE_JSON3" "${out%.%(ext)s}.$track.json3"
EOF
chmod +x "$work/bin/yt-dlp"
export PATH="$work/bin:$PATH" FAKE_INFO="$work/info.json" FAKE_JSON3="$work/sub.json3" FAKE_LOG="$work/track"

cat > "$FAKE_JSON3" <<'EOF'
{"events": [
  {"tStartMs": 0, "segs": [{"utf8": "hello"}]},
  {"tStartMs": 2000, "segs": [{"utf8": "world"}]},
  {"tStartMs": 2500, "segs": [{"utf8": "\n"}]},
  {"tStartMs": 3725000, "segs": [{"utf8": "late"}, {"utf8": " words"}]}
]}
EOF
info() { echo "{\"title\": \"T\", \"channel\": \"C\", \"upload_date\": \"20260101\", \"webpage_url\": \"https://youtu.be/x\", $1}" > "$FAKE_INFO"; }
fail() { echo "FAIL: $1" >&2; exit 1; }

# dubbed video: the -orig track in the spoken language, not the first one; 30 s chunks with start times
info '"language": "en-US", "subtitles": {}, "automatic_captions": {"de-DE-orig": [], "en-orig": [], "fr": []}'
out="$("$script" x)"
[ "$(cat "$FAKE_LOG")" = en-orig ] || fail "dubbed: picked $(cat "$FAKE_LOG")"
[ "$out" = "$(printf 'T\tC\t20260101\thttps://youtu.be/x\ten\n[00:00] hello world\n[1:02:05] late words')" ] || fail "dubbed output: $out"

# uploader captions beat auto captions, matched on the primary subtag
info '"language": "en-US", "subtitles": {"ar": [], "en": []}, "automatic_captions": {"en-orig": []}'
"$script" x > /dev/null
[ "$(cat "$FAKE_LOG")" = en ] || fail "manual: picked $(cat "$FAKE_LOG")"

# no stated language and several dubs: ask for it
info '"subtitles": {}, "automatic_captions": {"de-DE-orig": [], "en-orig": []}'
code=0; "$script" x > /dev/null 2>&1 || code=$?
[ "$code" = 4 ] || fail "unknown language: exit $code"

echo ok
