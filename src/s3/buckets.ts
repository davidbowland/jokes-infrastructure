import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/s3/bucket/

export const codePipelineArtifactBucket = new aws.s3.Bucket('ecs-artifact', {
  acl: 'private',
  bucket: 'jokes-ecs-artifacts',
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  versioning: {
    enabled: false,
  },
})

export const codePipelineSourceBucket = new aws.s3.Bucket('ecs-deploy', {
  acl: 'private',
  bucket: 'jokes-ecs-deploy',
  lifecycleRules: [
    {
      enabled: true,
      noncurrentVersionExpiration: {
        days: 15,
      },
    },
  ],
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  versioning: {
    enabled: true,
  },
})

export const lambdaSourceBucket = new aws.s3.Bucket('lambda-source', {
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
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  versioning: {
    enabled: true,
  },
})

export const logsBucket = new aws.s3.Bucket('logs', {
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
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  versioning: {
    enabled: true,
  },
})

export const uiSourceBucket = new aws.s3.Bucket('ui-source', {
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
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
  versioning: {
    enabled: true,
  },
})
