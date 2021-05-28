import * as awsx from '@pulumi/awsx'

import {
  zip_v1_jokes_get_handler,
  zip_v1_jokes_get_single_handler,
  zip_v1_jokes_random_handler,
  zip_v1_jokes_post_handler,
  zip_v1_jokes_put_handler,
  zip_v1_jokes_delete_handler,
} from '../lambda/functions'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/

export const api = new awsx.apigateway.API('joke-api', {
  routes: [
    {
      path: '/v1/jokes',
      method: 'GET',
      eventHandler: zip_v1_jokes_get_handler,
    },
    {
      path: '/v1/jokes/{jokeId}',
      method: 'GET',
      eventHandler: zip_v1_jokes_get_single_handler,
    },
    {
      path: '/v1/jokes/random',
      method: 'GET',
      eventHandler: zip_v1_jokes_random_handler,
    },
    {
      path: '/v1/jokes',
      method: 'POST',
      eventHandler: zip_v1_jokes_post_handler,
    },
    {
      path: '/v1/jokes/{jokeId}',
      method: 'PUT',
      eventHandler: zip_v1_jokes_put_handler,
    },
    {
      path: '/v1/jokes/{jokeId}',
      method: 'DELETE',
      eventHandler: zip_v1_jokes_delete_handler,
    },
  ],
})
