import * as aws from '@pulumi/aws'

import { userPool } from './user-pools'
import { acmCertificateArn, defaultAuthOrigin } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpooldomain/

export const userPoolDomain = new aws.cognito.UserPoolDomain('dbowland', {
  domain: defaultAuthOrigin,
  certificateArn: acmCertificateArn,
  userPoolId: userPool.id,
})
