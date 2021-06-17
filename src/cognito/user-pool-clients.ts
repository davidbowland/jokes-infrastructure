import * as aws from '@pulumi/aws'

import { jokes_users_user_pool } from './user-pools'
import { defaultOrigin } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpoolclient/

export const joke_client_user_pool_client = new aws.cognito.UserPoolClient('joke-client', {
  allowedOauthFlows: ['implicit'],
  allowedOauthFlowsUserPoolClient: true,
  allowedOauthScopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  callbackUrls: [`${defaultOrigin}/humor/`],
  logoutUrls: [`${defaultOrigin}/humor/`],
  name: 'joke-client',
  supportedIdentityProviders: ['COGNITO'],
  userPoolId: jokes_users_user_pool.id,
})
