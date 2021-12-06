import * as pulumi from '@pulumi/pulumi'

// Import Pulumi configuration
import './config'

// Import modules to create resources
import '@cognito'
import '@ec2'
import '@route53'
import '@s3'
import '@ses'

// Output

import { userPool } from '@cognito'

export const cognitoUserPoolEndpoint = pulumi.interpolate`https://${userPool.endpoint}`
