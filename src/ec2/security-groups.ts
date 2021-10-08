import * as awsx from '@pulumi/awsx'

import { createdBy, createdFor } from '../vars'
import { vpc } from './vpcs'

// https://www.pulumi.com/docs/reference/pkg/nodejs/pulumi/awsx/ec2/#security-groups

export const securityGroup = new awsx.ec2.SecurityGroup('security-group', {
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  vpc,
})

// awsx.ec2.SecurityGroupRule.egress(
//   'all-access',
//   securityGroup,
//   new awsx.ec2.AnyIPv4Location(),
//   new awsx.ec2.AllTcpPorts(),
//   'allow all access'
// )

// awsx.ec2.SecurityGroupRule.ingress(
//   'http-access',
//   securityGroup,
//   new awsx.ec2.AnyIPv4Location(),
//   new awsx.ec2.TcpPorts(80),
//   'allow http access'
// )

// awsx.ec2.SecurityGroupRule.ingress(
//   'https-access',
//   securityGroup,
//   new awsx.ec2.AnyIPv4Location(),
//   new awsx.ec2.TcpPorts(443),
//   'allow https access'
// )
