#!/bin/sh
set -e

pnpm exec prisma generate
pnpm exec prisma migrate deploy
pnpm run start:dev
