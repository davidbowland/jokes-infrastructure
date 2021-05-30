import * as awsx from '@pulumi/awsx'

import { zip_v1_jokes_handler } from '../lambda/functions'
import { resourceById, resourcePlain, resourceRandom } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/

export const api = new awsx.apigateway.API('joke-api', {
  routes: [
    // By ID
    {
      path: resourceById,
      method: 'GET',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourceById,
      method: 'PUT',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourceById,
      method: 'DELETE',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourceById,
      method: 'OPTIONS',
      eventHandler: zip_v1_jokes_handler,
    },
    // Plain
    {
      path: resourcePlain,
      method: 'GET',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourcePlain,
      method: 'POST',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourcePlain,
      method: 'OPTIONS',
      eventHandler: zip_v1_jokes_handler,
    },
    // Random
    {
      path: resourceRandom,
      method: 'GET',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      path: resourceRandom,
      method: 'OPTIONS',
      eventHandler: zip_v1_jokes_handler,
    },
  ],
})
