import * as aws from '@pulumi/aws'

import { userPool } from './user-pools'
import { defaultUIOrigin, projectName } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpoolclient/

const tokenValidity = {
  accessTokenValidity: 0.5, // Hours
  idTokenValidity: 0.5, // Hours
  refreshTokenValidity: 30, // Days
}

export const clientUserPoolClient = new aws.cognito.UserPoolClient('client', {
  allowedOauthFlows: ['implicit'],
  allowedOauthFlowsUserPoolClient: true,
  allowedOauthScopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  explicitAuthFlows: ['ALLOW_CUSTOM_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_SRP_AUTH'],
  callbackUrls: [`${defaultUIOrigin}`],
  logoutUrls: [`${defaultUIOrigin}`],
  name: `${projectName}-client`,
  preventUserExistenceErrors: 'ENABLED',
  supportedIdentityProviders: ['COGNITO'],
  ...tokenValidity,
  userPoolId: userPool.id,
})
