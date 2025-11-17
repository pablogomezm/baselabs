#!/bin/sh
set -e

echo "pnpm exec prisma generate"
pnpm exec prisma generate
echo "pnpm exec prisma migrate deploy"
pnpm exec prisma migrate deploy
echo "pnpm run start:dev"
pnpm run start:dev
