import * as aws from '@pulumi/aws'

import { joke_access_dynamodb_policy, lambda_kms_access_policy } from './policies'
import { joke_lambda_role } from './roles'

// https://www.pulumi.com/docs/reference/pkg/aws/iam/rolepolicyattachment/

export const joke_lambda_role_execute_access = new aws.iam.RolePolicyAttachment('joke-lambda-role-execute-access', {
  role: joke_lambda_role.name,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaExecute,
})

export const joke_lambda_role_dynamodb_access = new aws.iam.RolePolicyAttachment('joke-lambda-role-dynamodb-access', {
  role: joke_lambda_role.name,
  policyArn: joke_access_dynamodb_policy.arn,
})

export const joke_lambda_kms_access = new aws.iam.RolePolicyAttachment('joke-lambda-role-kms-access', {
  role: joke_lambda_role.name,
  policyArn: lambda_kms_access_policy.arn,
})
