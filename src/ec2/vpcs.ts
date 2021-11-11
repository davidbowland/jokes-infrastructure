import * as awsx from '@pulumi/awsx'

import { createdBy, createdFor } from '@vars'

// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/awsx/ec2/#custom-vpcs

export const vpc = new awsx.ec2.Vpc('vpc', {
  cidrBlock: '10.0.0.0/16',
  numberOfNatGateways: 0,
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
