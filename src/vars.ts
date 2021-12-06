/* General */

export const awsAccountId = process.env.AWS_ACCOUNT_ID
export const domainName = 'bowland.link'
export const projectName = 'jokes'

export const createdBy = `${projectName}-infrastructure`
export const createdFor = projectName

/* Cognito */

export const acmCertificateArn = `arn:aws:acm:us-east-1:${awsAccountId}:certificate/6a48cba7-feb9-4de5-8cbf-d383140fcdef`
export const defaultAuthOrigin = `${projectName}-auth.${domainName}`
export const defaultUIOrigin = `https://${projectName}.${domainName}`
