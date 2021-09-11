#!/bin/sh

# Stop immediately on error
set -e

if [[ -z "$1" ]]; then
  $(./scripts/assumeDeveloperRole.sh)
fi

# Lint to catch syntax issues
npm run lint

# This command generates a preview and gives a prompt before pushing changes
cd src/
pulumi up -s dev
