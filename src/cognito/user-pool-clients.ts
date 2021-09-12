import * as aws from '@pulumi/aws'

import { jokes_users_user_pool } from './user-pools'
import { cloudFrontOrigin, defaultOrigin } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpoolclient/

export const jokes_client_user_pool_client = new aws.cognito.UserPoolClient('jokes-client', {
  allowedOauthFlows: ['implicit'],
  allowedOauthFlowsUserPoolClient: true,
  allowedOauthScopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  callbackUrls: [`${defaultOrigin}/humor/,${cloudFrontOrigin}`],
  logoutUrls: [`${defaultOrigin}/humor/,${cloudFrontOrigin}`],
  name: 'jokes-client',
  supportedIdentityProviders: ['COGNITO'],
  userPoolId: jokes_users_user_pool.id,
})
