#!/usr/bin/env bash

# Stop immediately on error
set -e

if [[ -z "$1" ]]; then
  $(./scripts/assumeDeveloperRole.sh)
fi

# Deploy infrastructure

aws cloudformation deploy --template-file template.yaml --stack-name jokes-infrastructure-test --parameter-overrides AccountId=$AWS_ACCOUNT_ID Environment=test

COGNITO_DOMAIN_NAME=$(aws cloudformation describe-stacks --stack-name jokes-infrastructure-test --output text --query 'Stacks[0].Outputs[?OutputKey==`UserPoolDomainName`].OutputValue')
CLOUDFRONT_DOMAIN_NAME=$(aws cognito-idp describe-user-pool-domain --domain "$COGNITO_DOMAIN_NAME" | grep CloudFrontDistribution | cut -d \" -f4)
aws cloudformation deploy --template-file template-dns.yaml --stack-name jokes-infrastructure-dns-test --parameter-overrides AccountId=$AWS_ACCOUNT_ID CloudFrontDomainName=$CLOUDFRONT_DOMAIN_NAME CognitoDomain=$COGNITO_DOMAIN_NAME Environment=test
