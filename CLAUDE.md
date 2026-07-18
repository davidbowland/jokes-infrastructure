# Project Guidelines

**Always commit changes** after completing work unless explicitly told not to.

This is an **infrastructure repo**: AWS SAM / CloudFormation templates, deploy
scripts, and DNS/stack config. There is little or no application code here — the
Lambda source lives in the sibling `jokes-api` repo. Keep changes declarative and
reviewable.

## Layout

- `template.yaml` — the SAM/CloudFormation stack (primary artifact): Cognito user
  pool/client/identity pool, the Lambda artifact bucket, and pipeline/CloudFormation
  IAM roles.
- `template-dns.yaml` — Route 53 / ACM records for the Cognito auth domain.
- `deploy.sh`, `scripts/` — deployment and role-assumption helpers (shell).
- No `src/`, no jest, no eslint. `lint` is `prettier --write .` only.

## Commands

- **Format:** `npm run lint` (prettier only).
- **Validate template:** `sam validate --lint`
- **Deploy (local/manual):** `./deploy.sh` — assumes the scoped pipeline role, then
  `sam deploy` for both `template.yaml` and `template-dns.yaml`. CI deploys via
  `.github/workflows/pipeline.yaml`.
- Never run a deploy that targets production without an explicit request.

## Style

- Prefer **functional, declarative** template composition; avoid copy-paste between
  the testing and production parameter sets — parameterize with `Environment`.
- Keep resource logical IDs and parameter names consistent with the sibling repos'
  conventions (jokes-api/jokes-ui reference the `jokes-pipeline`/`jokes-cloudformation`
  roles and Cognito IDs this repo defines — drift is entropy, not intent).

## Security (CloudFormation)

- **No secrets in plaintext CFN parameters.** Where a parameter carries an API key
  or token, it MUST have `NoEcho: true`. (Full secret removal / SSM migration is a
  separate pass — do not attempt here.)
- **IAM least privilege:** scope actions to specific resource ARNs. Avoid
  `Resource: '*'` and broad `service:*` actions in runtime roles. Keep the scoped
  SAM policy-template style.
- Do NOT, in this pass, change the `role/full-access` pipeline deploy role, the
  Cognito OAuth implicit-flow client, or the Identity Pool's unauthenticated-access
  configuration — those are explicitly out of scope (see work-order).

## Hygiene

- `LICENSE` (ISC) present and `"license": "ISC"` in package.json.
- `.github/dependabot.yml` (npm weekly + github-actions weekly).
- `.gitignore` covers `.aws-sam/`, `*.log`, `.DS_Store`.
