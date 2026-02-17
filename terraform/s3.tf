# ============================================================================
# S3 Bucket - Web Application Hosting
# ============================================================================

resource "aws_s3_bucket" "web_app" {
  bucket = "${var.app_name}-${var.environment}-web"

  tags = {
    Name = "${var.app_name}-${var.environment}-web"
  }
}

resource "aws_s3_bucket_versioning" "web_app" {
  bucket = aws_s3_bucket.web_app.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "web_app" {
  bucket = aws_s3_bucket.web_app.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "web_app" {
  bucket = aws_s3_bucket.web_app.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "web_app" {
  bucket = aws_s3_bucket.web_app.id
  policy = data.aws_iam_policy_document.s3_cloudfront_access.json

  depends_on = [aws_s3_bucket_public_access_block.web_app]
}

data "aws_iam_policy_document" "s3_cloudfront_access" {
  statement {
    sid    = "AllowCloudFrontServicePrincipal"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.web_app.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.web_app.arn]
    }
  }
}

# ============================================================================
# S3 Bucket - CloudFront Access Logs
# ============================================================================

resource "aws_s3_bucket" "access_logs" {
  bucket = "${var.app_name}-${var.environment}-access-logs"

  tags = {
    Name = "${var.app_name}-${var.environment}-access-logs"
  }
}

resource "aws_s3_bucket_ownership_controls" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id
  acl    = "log-delivery-write"

  depends_on = [aws_s3_bucket_ownership_controls.access_logs]
}

resource "aws_s3_bucket_server_side_encryption_configuration" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    expiration {
      days = 90
    }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 60
      storage_class = "GLACIER"
    }
  }
}
