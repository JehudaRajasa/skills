#!/usr/bin/env bash
# Usage: fetch_transcript.sh <youtube-url> [language]
#   language: the video's spoken language (e.g. ko); only needed after exit 4
# stdout line 1: title<TAB>channel<TAB>upload_date<TAB>webpage_url<TAB>language (real tabs)
# stdout rest:   transcript in the language the video is spoken in, one line per 30 seconds,
#                each led by its start time: [mm:ss] text ([h:mm:ss] past the first hour)
# exit 3: no captions in the video's own language
# exit 4: the video doesn't say what language it is in; rerun with [language]
set -euo pipefail
shopt -s nullglob

url="$1"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
info="$tmp/info.json"

yt-dlp --skip-download -J "$url" > "$info"

# *-orig auto tracks transcribe an audio track; every other auto track is a machine translation.
# A dubbed video carries one *-orig per dub, so pick the one in the spoken language.
origs="$(jq -r '[(.automatic_captions // {}) | keys[] | select(endswith("-orig")) | rtrimstr("-orig")] | join(" ")' "$info")"
lang="${2:-$(jq -r '.language // empty' "$info")}"
if [ -z "$lang" ] && [[ "$origs" != *" "* ]]; then lang="$origs"; fi
if [ -z "$lang" ]; then
  echo "video language unknown; uploader captions: $(jq -r '(.subtitles // {}) | keys | join(" ")' "$info"); audio transcriptions: $origs" >&2
  exit 4
fi

# the track in the spoken language: its exact code, else one sharing its primary subtag (en-US ~ en)
in_lang() { jq -r --arg l "$lang" 'map(select(split("-")[0] == ($l | split("-")[0]))) | sort_by(. != $l) | first // empty'; }
manual="$(jq '(.subtitles // {}) | keys' "$info" | in_lang)"
orig="$(jq -n --arg o "$origs" '$o | split(" ")' | in_lang)"

# captions the uploader wrote beat auto captions
if [ -n "$manual" ]; then
  track="$manual" kind=--write-subs
elif [ -n "$orig" ]; then
  track="$orig-orig" kind=--write-auto-subs lang="$orig"
else
  echo "no captions in the video's own language ($lang)" >&2
  exit 3
fi

yt-dlp -q --load-info-json "$info" --skip-download "$kind" --sub-langs "^$track\$" \
  --sub-format json3 -o "$tmp/sub.%(ext)s" >&2
files=("$tmp"/sub.*.json3)
if [ ${#files[@]} -eq 0 ]; then
  echo "caption track $track listed but not downloaded" >&2
  exit 3
fi

jq -r --arg l "$lang" '[.title, .channel, .upload_date, .webpage_url, $l] | @tsv' "$info"
# join caption events with a space so words at event edges stay apart
jq -r '
  def two: tostring | if length < 2 then "0" + . else . end;
  [.events[]? | select(.segs) | {t: ((.tStartMs // 0) / 1000 | floor), s: ([.segs[].utf8] | join(""))}]
  | group_by(.t / 30 | floor)[]
  | .[0].t as $t
  | ([.[].s] | join(" ") | gsub("\\s+"; " ") | ltrimstr(" ") | rtrimstr(" ")) as $text
  | select($text != "")
  | "[" + (if $t >= 3600 then "\($t / 3600 | floor):" else "" end)
    + "\($t / 60 | floor % 60 | two):\($t % 60 | two)] " + $text
' "${files[0]}"
