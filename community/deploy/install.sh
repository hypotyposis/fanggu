#!/bin/bash
# Installs or updates the community service on a Debian 12 host. deploy.sh stages this directory
# and runs it as root; running it again only replaces code and configuration, never the database.
#   bash install.sh api.example.com
set -euo pipefail

domain=${1:?usage: install.sh DOMAIN}
if [[ ! $domain =~ ^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$ ]]; then
  echo "Not a domain name: $domain" >&2
  exit 2
fi
if [[ $(id -u) != 0 ]]; then
  echo "Run as root." >&2
  exit 2
fi
here=$(cd "$(dirname "$0")" && pwd)
app=/opt/fanggu-community
backups=/var/backups/fanggu-community

python3 -c 'import sys; assert sys.version_info >= (3, 11), sys.version'
# Caddy serves HTTPS; unattended-upgrades applies Debian security updates on its own.
if ! command -v caddy >/dev/null || ! dpkg -s unattended-upgrades >/dev/null 2>&1; then
  apt-get update -q
  DEBIAN_FRONTEND=noninteractive apt-get install -y -q caddy unattended-upgrades
fi
# Small instances ship without swap; 1 GiB keeps package upgrades from being killed for memory.
if [[ -z $(swapon --noheadings) ]]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile >/dev/null
  swapon /swapfile
  grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi
id fanggu >/dev/null 2>&1 || useradd --system --no-create-home --home-dir /var/lib/fanggu-community --shell /usr/sbin/nologin fanggu

install -d -m 755 "$app"
install -m 644 "$here/server.py" "$here/moderate.py" "$here/backup.py" "$here/catalog.json" "$app/"
install -d -o fanggu -g fanggu -m 750 "$backups"
install -m 644 "$here/fanggu-community.service" "$here/fanggu-community-backup.service" \
  "$here/fanggu-community-backup.timer" /etc/systemd/system/

sed "s/__DOMAIN__/$domain/" "$here/Caddyfile" > /etc/caddy/Caddyfile.new
caddy validate --config /etc/caddy/Caddyfile.new --adapter caddyfile
mv /etc/caddy/Caddyfile.new /etc/caddy/Caddyfile

systemctl daemon-reload
systemctl enable --now fanggu-community-backup.timer
systemctl enable fanggu-community
systemctl restart fanggu-community
systemctl enable caddy
systemctl reload-or-restart caddy

python3 - <<'EOF'
import time, urllib.request
for _ in range(40):
    try:
        with urllib.request.urlopen('http://127.0.0.1:8787/health', timeout=2) as r:
            print('service:', r.read().decode())
            break
    except OSError:
        time.sleep(0.5)
else:
    raise SystemExit('The service did not answer; see: journalctl -u fanggu-community -n 50')
EOF
echo "Installed. Public URL once DNS and the certificate are ready: https://$domain/health"
