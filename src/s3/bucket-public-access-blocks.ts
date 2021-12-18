import * as aws from '@pulumi/aws'

import { ecsSourceBucket, lambdaSourceBucket } from './buckets'

// https://www.pulumi.com/registry/packages/aws/api-docs/s3/bucketpublicaccessblock/

export const ecsPublicAccessBlock = new aws.s3.BucketPublicAccessBlock('ecs-public-access-block', {
  blockPublicAcls: true,
  blockPublicPolicy: true,
  bucket: ecsSourceBucket.bucket,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
})

export const lambdaPublicAccessBlock = new aws.s3.BucketPublicAccessBlock('lambda-public-access-block', {
  blockPublicAcls: true,
  blockPublicPolicy: true,
  bucket: lambdaSourceBucket.bucket,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
})
