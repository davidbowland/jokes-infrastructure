import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '@vars'

//www.pulumi.com/docs/reference/pkg/aws/cognito/userpool/

export const userPool = new aws.cognito.UserPool('users', {
  adminCreateUserConfig: {
    allowAdminCreateUserOnly: true,
  },
  accountRecoverySetting: {
    recoveryMechanisms: [
      {
        name: 'verified_email',
        priority: 1,
      },
    ],
  },
  autoVerifiedAttributes: ['email'],
  deviceConfiguration: {
    deviceOnlyRememberedOnUserPrompt: true,
  },
  mfaConfiguration: 'OPTIONAL',
  name: 'jokes-users',
  passwordPolicy: {
    minimumLength: 12,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false,
    requireUppercase: false,
    temporaryPasswordValidityDays: 14,
  },
  smsAuthenticationMessage: 'Your authentication code is {####}.',
  softwareTokenMfaConfiguration: {
    enabled: true,
  },
  usernameAttributes: ['email'],
  usernameConfiguration: {
    caseSensitive: false,
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
