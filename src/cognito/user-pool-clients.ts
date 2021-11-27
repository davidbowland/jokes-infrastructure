import * as aws from '@pulumi/aws'

import { userPool } from './user-pools'
import { cloudFrontOrigin, defaultOrigin } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpoolclient/

const tokenValidity = {
  accessTokenValidity: 30, // Minutes
  idTokenValidity: 30, // Minutes
  refreshTokenValidity: 30, // Days
}

export const clientUserPoolClient = new aws.cognito.UserPoolClient('client', {
  allowedOauthFlows: ['implicit'],
  allowedOauthFlowsUserPoolClient: true,
  allowedOauthScopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  explicitAuthFlows: ['ALLOW_CUSTOM_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_SRP_AUTH'],
  callbackUrls: [`${defaultOrigin},${cloudFrontOrigin}`],
  logoutUrls: [`${defaultOrigin},${cloudFrontOrigin}`],
  name: 'jokes-client',
  preventUserExistenceErrors: 'ENABLED',
  supportedIdentityProviders: ['COGNITO'],
  ...tokenValidity,
  userPoolId: userPool.id,
})
