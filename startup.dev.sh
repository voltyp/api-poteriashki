#!/usr/bin/env bash
set -e

/usr/local/bin/wait-for-it.sh poteriashki_db:5432
npm run migration:run
npm run start:prod
