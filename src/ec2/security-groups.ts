import * as awsx from '@pulumi/awsx'

import { createdBy, createdFor } from '@vars'
import { vpc } from './vpcs'

// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/awsx/ec2/#security-groups

export const securityGroup = new awsx.ec2.SecurityGroup('security-group', {
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  vpc,
})
