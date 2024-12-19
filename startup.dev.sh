#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
bun run migration:run
bun run seed:run
bun run start:prod
