# Lint to catch syntax issues
npm run lint

./scripts/assumeDeveloperRole.sh

# Generate a preview of what will change
cd src/
pulumi preview -s dev
