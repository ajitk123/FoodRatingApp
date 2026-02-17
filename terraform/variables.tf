variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment (staging, prod)"
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["staging", "prod"], var.environment)
    error_message = "Environment must be either 'staging' or 'prod'."
  }
}

variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
  default     = "foodratingapp"
}

variable "domain_name" {
  description = "Custom domain name for the application (optional)"
  type        = string
  default     = ""
}

variable "enable_waf" {
  description = "Enable AWS WAF for CloudFront distribution"
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "CloudWatch log retention period in days"
  type        = number
  default     = 30
}

variable "enable_notifications" {
  description = "Enable SNS notifications for deployment events"
  type        = bool
  default     = false
}

variable "notification_email" {
  description = "Email address for deployment notifications"
  type        = string
  default     = ""
}
