#!/bin/sh
# entrypoint.sh — Frontend (nginx:alpine) with optional Fail2ban protection.
#
# Fail2ban requires the host kernel to support iptables (Linux with NET_ADMIN).
# On Docker Desktop for Windows / macOS the kernel capability may not be fully
# available, so we treat a Fail2ban startup failure as non-fatal: Nginx still
# starts and serves the SPA; Fail2ban just won't be protecting it.

set -e

# ── 1. Nginx log files ────────────────────────────────────────────────────────
# nginx:alpine symlinks access.log → /dev/stdout and error.log → /dev/stderr.
# Replace them with real files so Fail2ban (polling backend) can tail them.
mkdir -p /var/log/nginx
rm -f /var/log/nginx/access.log /var/log/nginx/error.log
touch /var/log/nginx/access.log /var/log/nginx/error.log
chmod 644 /var/log/nginx/access.log /var/log/nginx/error.log

# ── 2. Fail2ban (best-effort) ─────────────────────────────────────────────────
mkdir -p /var/run/fail2ban
rm -f /var/run/fail2ban/fail2ban.sock /var/run/fail2ban/fail2ban.pid

# Try to start fail2ban-server; ignore errors so Nginx always starts even if
# iptables is unavailable (e.g. Docker Desktop for Windows kernel limitations).
if fail2ban-server \
       -b \
       -s /var/run/fail2ban/fail2ban.sock \
       -p /var/run/fail2ban/fail2ban.pid; then
  echo "[entrypoint] Fail2ban started successfully."
else
  echo "[entrypoint] WARNING: Fail2ban could not start (iptables/kernel unavailable?). Nginx will run unprotected."
fi

# ── 3. Stream access log to docker logs ───────────────────────────────────────
tail -f /var/log/nginx/access.log &

# ── 4. Nginx (foreground, PID 1) ─────────────────────────────────────────────
exec nginx -g "daemon off;"
