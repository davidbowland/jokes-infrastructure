/* General */

export const awsAccountId = process.env.AWS_ACCOUNT_ID
export const projectName = 'jokes'

export const createdBy = `${projectName}-infrastructure`
export const createdFor = projectName

/* Cognito */

export const acmCertificateArn = `arn:aws:acm:us-east-1:${awsAccountId}:certificate/6a48cba7-feb9-4de5-8cbf-d383140fcdef`
export const defaultAuthOrigin = `${projectName}-auth.bowland.link`
export const defaultUIOrigin = `https://${projectName}.bowland.link`
export const cloudFrontOrigin = 'https://d8m2rj7f9egv3.cloudfront.net/'
