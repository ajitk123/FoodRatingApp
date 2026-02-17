output "website_url" {
  description = "CloudFront distribution URL for the web application"
  value       = "https://${aws_cloudfront_distribution.web_app.domain_name}"
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the web application"
  value       = aws_s3_bucket.web_app.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidation in CI/CD)"
  value       = aws_cloudfront_distribution.web_app.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.web_app.domain_name
}

output "deployer_role_arn" {
  description = "IAM role ARN for CI/CD pipeline deployment"
  value       = aws_iam_role.github_actions_deployer.arn
}

output "deployer_access_key_id" {
  description = "Access key ID for the CI/CD deployer user"
  value       = aws_iam_access_key.deployer.id
  sensitive   = true
}

output "deployer_secret_access_key" {
  description = "Secret access key for the CI/CD deployer user"
  value       = aws_iam_access_key.deployer.secret
  sensitive   = true
}

output "log_group_name" {
  description = "CloudWatch log group for access logs"
  value       = aws_cloudwatch_log_group.app_logs.name
}
