#!/bin/sh
set -e

echo "pnpm exec prisma migrate deploy"
pnpm exec prisma migrate deploy

echo "pnpm exec prisma db seed"
pnpm exec prisma db seed

echo "exec node dist/main"
exec node dist/src/main
