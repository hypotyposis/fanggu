#!/bin/sh
# Ships the community service from this checkout to a server and installs it.
#   sh community/deploy/deploy.sh fanggu-hk api.example.com
# SSH_HOST is a Host alias from ~/.ssh/config. Runs the service tests first and stops if they fail.
# shellcheck disable=SC2029  # $remote and $domain are meant to expand locally in the ssh commands.
set -eu

host=${1:?usage: deploy.sh SSH_HOST DOMAIN}
domain=${2:?usage: deploy.sh SSH_HOST DOMAIN}
root=$(CDPATH='' cd -- "$(dirname -- "$0")/../.." && pwd)

python3 -B -m unittest discover -s "$root/community" -p 'test_*.py' >/dev/null 2>&1 || {
  echo "Community tests failed; not deploying. Run: python3 -m unittest discover -s community -p 'test_*.py'" >&2
  exit 1
}

stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT
cp "$root/community/server.py" "$root/community/moderate.py" \
  "$root/community/deploy/backup.py" "$root/community/deploy/install.sh" "$root/community/deploy/Caddyfile" \
  "$root/community/deploy/fanggu-community.service" "$root/community/deploy/fanggu-community-backup.service" \
  "$root/community/deploy/fanggu-community-backup.timer" "$root/ios/Fanggu/Resources/catalog.json" "$stage/"

remote=/tmp/fanggu-community-deploy
ssh "$host" "rm -rf $remote && mkdir -m 700 $remote"
scp -q "$stage"/* "$host:$remote/"
ssh "$host" "if [ \"\$(id -u)\" = 0 ]; then bash $remote/install.sh '$domain'; else sudo bash $remote/install.sh '$domain'; fi; rm -rf $remote"
