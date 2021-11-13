// Import Pulumi configuration
import './config'

// Import modules to create resources
import { userPool } from './src'

// Output

export const cognitoUserPoolEndpoint = `https://${userPool.endpoint}`
