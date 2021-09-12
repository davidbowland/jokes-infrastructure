import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/s3/bucket/

export const jokes_lambda_source_bucket = new aws.s3.Bucket('jokes-lambda-source', {
  acl: 'private',
  bucket: 'jokes-lambda-source',
  lifecycleRules: [
    {
      enabled: true,
      noncurrentVersionExpiration: {
        days: 15,
      },
    },
  ],
  versioning: {
    enabled: true,
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const jokes_logs_bucket = new aws.s3.Bucket('jokes-logs', {
  acl: 'private',
  bucket: 'jokes-logs',
  lifecycleRules: [
    {
      enabled: true,
      noncurrentVersionExpiration: {
        days: 15,
      },
    },
  ],
  versioning: {
    enabled: true,
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const jokes_ui_source_bucket = new aws.s3.Bucket('jokes-ui-source', {
  acl: 'public-read',
  bucket: 'jokes-ui-source',
  lifecycleRules: [
    {
      enabled: true,
      noncurrentVersionExpiration: {
        days: 15,
      },
    },
  ],
  versioning: {
    enabled: true,
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
