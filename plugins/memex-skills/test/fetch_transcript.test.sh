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
# -J logs the URL and prints the canned info; a subtitle download writes the canned captions and logs the track
if [[ " $* " == *" -J "* ]]; then echo "${@: -1}" > "$FAKE_URL"; cat "$FAKE_INFO"; exit; fi
while [ $# -gt 0 ]; do
  case "$1" in --sub-langs) track="${2#^}" track="${track%\$}"; shift ;; -o) out="$2"; shift ;; esac
  shift
done
echo "$track" > "$FAKE_LOG"
cp "$FAKE_SUB" "${out%.%(ext)s}.$track.${FAKE_SUB##*.}"
EOF
chmod +x "$work/bin/yt-dlp"
export PATH="$work/bin:$PATH" FAKE_INFO="$work/info.json" FAKE_SUB="$work/sub.json3" FAKE_LOG="$work/track" FAKE_URL="$work/url"

cat > "$FAKE_SUB" <<'EOF'
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

# a non-YouTube site: vtt captions (TED pads empty cues with a space and repeats some cues back to back), uploader for channel; a vimeo.com page goes through the embed player
cat > "$work/sub.vtt" <<'EOF'
WEBVTT

00:00.000 --> 00:00.001
 

1
00:01.000 --> 00:02.500 align:start
<v Ken>Tom &amp; Jerry</v>
two lines

00:00:35.000 --> 00:00:36.000
<i>later</i>
00:00:35.000 --> 00:00:36.000
<i>later</i>
EOF
export FAKE_SUB="$work/sub.vtt"
echo '{"title": "T", "uploader": "U", "webpage_url": "https://vimeo.com/1", "language": "en", "subtitles": {"en": []}}' > "$FAKE_INFO"
out="$("$script" https://vimeo.com/1)"
[ "$(cat "$FAKE_URL")" = https://player.vimeo.com/video/1 ] || fail "vimeo url: $(cat "$FAKE_URL")"
[ "$out" = "$(printf 'T\tU\t\thttps://vimeo.com/1\ten\n[00:01] Tom & Jerry two lines\n[00:35] later')" ] || fail "vtt output: $out"

echo ok
