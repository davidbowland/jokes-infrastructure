./scripts/assumeDeveloperRole.sh

# Refresh state with infrastructure
cd src/
pulumi refresh -s dev
