# ============================================================================
# IAM - GitHub Actions Deployer
# ============================================================================

resource "aws_iam_user" "deployer" {
  name = "${var.app_name}-${var.environment}-deployer"
  path = "/ci-cd/"

  tags = {
    Name = "${var.app_name}-${var.environment}-deployer"
  }
}

resource "aws_iam_access_key" "deployer" {
  user = aws_iam_user.deployer.name
}

resource "aws_iam_user_policy" "deployer_s3" {
  name   = "${var.app_name}-${var.environment}-s3-deploy"
  user   = aws_iam_user.deployer.name
  policy = data.aws_iam_policy_document.deployer_s3.json
}

data "aws_iam_policy_document" "deployer_s3" {
  statement {
    sid    = "S3BucketAccess"
    effect = "Allow"

    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:ListBucket",
      "s3:GetBucketLocation",
    ]

    resources = [
      aws_s3_bucket.web_app.arn,
      "${aws_s3_bucket.web_app.arn}/*",
    ]
  }

  statement {
    sid    = "CloudFrontInvalidation"
    effect = "Allow"

    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation",
      "cloudfront:ListInvalidations",
    ]

    resources = [aws_cloudfront_distribution.web_app.arn]
  }
}

# ============================================================================
# IAM Role - GitHub Actions OIDC (Recommended for production)
# ============================================================================

data "aws_caller_identity" "current" {}

resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]

  tags = {
    Name = "github-actions-oidc"
  }
}

resource "aws_iam_role" "github_actions_deployer" {
  name = "${var.app_name}-${var.environment}-github-actions"

  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json

  tags = {
    Name = "${var.app_name}-${var.environment}-github-actions-role"
  }
}

data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    sid    = "GitHubActionsOIDC"
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:*:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role_policy" "github_actions_deploy" {
  name   = "${var.app_name}-${var.environment}-deploy-policy"
  role   = aws_iam_role.github_actions_deployer.id
  policy = data.aws_iam_policy_document.deployer_s3.json
}

# ============================================================================
# CloudWatch Logs
# ============================================================================

resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/aws/${var.app_name}/${var.environment}"
  retention_in_days = var.log_retention_days

  tags = {
    Name = "${var.app_name}-${var.environment}-logs"
  }
}
