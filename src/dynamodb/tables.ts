import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/dynamodb/table/

export const dbowland_jokes_table = new aws.dynamodb.Table('dbowland-jokes-table', {
  attributes: [
    {
      name: 'Index',
      type: 'N',
    },
  ],
  name: 'dbowland-jokes',
  billingMode: 'PAY_PER_REQUEST',
  hashKey: 'Index',
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
