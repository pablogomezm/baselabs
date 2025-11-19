#!/usr/bin/env sh
set -e

# pnpm setup
corepack enable >/dev/null 2>&1 || true
corepack prepare pnpm@latest --activate >/dev/null 2>&1 || true

# if lockfile is newer than node_modules, install dependencies
if [ ! -d node_modules ] || [ ! -f node_modules/.pnpm-integrity ] || \
   [ pnpm-lock.yaml -nt node_modules/.pnpm-integrity ]; then
  echo "pnpm install required, installing..."
  echo "pnpm install --frozen-lockfile"
  pnpm install --frozen-lockfile
fi

echo "pnpm exec prisma generate"
pnpm exec prisma generate

echo "pnpm exec prisma migrate deploy"
pnpm exec prisma migrate deploy

echo "pnpm run start:dev"
exec pnpm run start:dev
