import * as awsx from '@pulumi/awsx'

import { joke_cognito_authorizer } from '../cognito/authorizers'
import { zip_v1_jokes_handler } from '../lambda/functions'
import { resourceById, resourcePlain, resourceRandom } from '../vars'

// https://www.pulumi.com/docs/reference/pkg/aws/apigateway/

export const joke_api = new awsx.apigateway.API('joke-api', {
  routes: [
    // By ID
    {
      authorizers: [joke_cognito_authorizer],
      path: resourceById,
      method: 'GET',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      authorizers: [joke_cognito_authorizer],
      path: resourceById,
      method: 'PUT',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      authorizers: [joke_cognito_authorizer],
      path: resourceById,
      method: 'DELETE',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      authorizers: [joke_cognito_authorizer],
      path: resourceById,
      method: 'OPTIONS',
      eventHandler: zip_v1_jokes_handler,
    },
    // Plain
    {
      authorizers: [joke_cognito_authorizer],
      path: resourcePlain,
      method: 'GET',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      authorizers: [joke_cognito_authorizer],
      path: resourcePlain,
      method: 'POST',
      eventHandler: zip_v1_jokes_handler,
    },
    {
      authorizers: [joke_cognito_authorizer],
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
