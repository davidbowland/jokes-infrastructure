import * as aws from '@pulumi/aws'

// https://www.pulumi.com/docs/reference/pkg/aws/provider/

export const usEast1 = new aws.Provider('provider-us-east-1', { region: aws.Region.USEast1 })
