import * as aws from '@pulumi/aws'

import { us_east_1 } from '../providers'

// https://www.pulumi.com/docs/reference/pkg/aws/ses/emailidentity/

const do_not_reply = new aws.ses.EmailIdentity(
  'do-not-reply',
  {
    email: 'do-not-reply@dbowland.com',
  },
  { provider: us_east_1 }
)
