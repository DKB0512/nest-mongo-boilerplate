#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
bun run migration:run
bun run seed:run
bun run start:prod > /dev/null 2>&1 &
/opt/wait-for-it.sh maildev:1080
/opt/wait-for-it.sh localhost:3000
bun run lint
bun run test:e2e -- --runInBand
