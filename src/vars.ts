export const createdBy = 'dbowland-pulumi-jokes'
export const createdFor = 'dbowland-jokes'

export const environmentVariableKmsArn = 'arn:aws:kms:*:*:key/aws/lambda'

export const defaultOrigin = 'https://dbowland.com'
export const corsOrigins = `${defaultOrigin},http://localhost:8000`
export const fetchCountMaximum = '10'
export const jokeTableReferenceIndex = '0'
export const lambdaTimeoutInSeconds = 15

export const resourceById = '/v1/jokes/{jokeId}'
export const resourcePlain = '/v1/jokes'
export const resourceRandom = '/v1/jokes/random'
