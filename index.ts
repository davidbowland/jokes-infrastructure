import * as pulumi from '@pulumi/pulumi'

// Import Pulumi configuration
import './config'

// Import modules to create resources
import { userPool } from './src'

// Output

export const cognitoUserPoolEndpoint = pulumi.interpolate`https://${userPool.endpoint}`
