# Ensure current version of master is pulled
# git checkout master
# git pull --ff-only

# Lint to catch syntax issues
npm run lint

./scripts/assumeDeveloperRole.sh

# This command generates a preview and gives a prompt before pushing changes
cd src/
pulumi up -s dev

# Bump the minor version
# npm version minor

# Push code changes
# git push --no-verify
