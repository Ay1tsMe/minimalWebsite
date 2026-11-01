#!/usr/bin/env bash
# Migrate tuxtower from Zola shortcodes to Zola 0.23 / Tera 2 components.
# Run from the site root (the folder with config.toml), with components.html next to this script.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
[ -f config.toml ] || { echo "Run this from your site root (where config.toml is)."; exit 1; }

# 1. Install the components
cp "$here/components.html" templates/components.html

# 2. Retire the old shortcodes folder (kept as a backup outside templates/)
if [ -d templates/shortcodes ]; then
  mkdir -p .old_shortcodes && mv templates/shortcodes/* .old_shortcodes/ && rmdir templates/shortcodes
fi

# 3. Rewrite every resize_image / local_video call in content/ to the new syntax
find content -name '*.md' -print0 | xargs -0 perl -pi -e '
s{\{\{<?\s*(resize_image|local_video)\s*\(?\s*(.*?)\s*\)?\s*/?>?\s*\}\}}{
  my ($n,$a)=($1,$2); $n = $n eq q(resize_image) ? q(image) : q(video);
  $a =~ s/,\s*/ /g; $a =~ s/=(\d+)\b/={$1}/g;
  "{{<$n $a />}}"
}ge;'

echo "Done. Remaining old-style calls (should be none):"
grep -rnE '\{\{ *(resize_image|local_video)' content/ || echo "  none"
