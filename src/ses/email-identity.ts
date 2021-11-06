import * as aws from '@pulumi/aws'

import { usEast1 } from '../providers'

// https://www.pulumi.com/docs/reference/pkg/aws/ses/emailidentity/

export const doNotReplyAddress = new aws.ses.EmailIdentity(
  'do-not-reply',
  {
    email: 'do-not-reply@dbowland.com',
  },
  {
    provider: usEast1,
  }
)
