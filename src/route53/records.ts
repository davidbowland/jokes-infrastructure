import * as aws from '@pulumi/aws'

import { userPoolDomain } from '@cognito'
import { zone } from './zones'

// https://www.pulumi.com/registry/packages/aws/api-docs/route53/record/

export const cognitoDomainRecord = new aws.route53.Record('cognito-domain', {
  aliases: [
    {
      evaluateTargetHealth: false,
      name: userPoolDomain.cloudfrontDistributionArn,
      zoneId: 'Z2FDTNDATAQYW2',
    },
  ],
  name: userPoolDomain.domain,
  type: 'A',
  zoneId: zone.then((zone) => zone.zoneId),
})
