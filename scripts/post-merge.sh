#!/bin/bash
set -e
npm install --frozen-lockfile
npm run push --workspace=@workspace/db
