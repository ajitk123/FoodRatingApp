# ============================================================================
# CloudFront Distribution - Web Application CDN
# ============================================================================

resource "aws_cloudfront_origin_access_control" "web_app" {
  name                              = "${var.app_name}-${var.environment}-oac"
  description                       = "OAC for ${var.app_name} S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "web_app" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.app_name} ${var.environment} web application"
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  http_version        = "http2and3"

  origin {
    domain_name              = aws_s3_bucket.web_app.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.web_app.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.web_app.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.web_app.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    cache_policy_id            = aws_cloudfront_cache_policy.optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id
  }

  # Cache static assets aggressively
  ordered_cache_behavior {
    path_pattern           = "/static/*"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.web_app.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    cache_policy_id            = aws_cloudfront_cache_policy.static_assets.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id
  }

  # SPA fallback: serve index.html for client-side routes
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.access_logs.bucket_domain_name
    prefix          = "cloudfront/"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  tags = {
    Name = "${var.app_name}-${var.environment}-distribution"
  }
}

# ============================================================================
# CloudFront Cache Policies
# ============================================================================

resource "aws_cloudfront_cache_policy" "optimized" {
  name        = "${var.app_name}-${var.environment}-optimized"
  comment     = "Cache policy for HTML and API responses"
  default_ttl = 86400    # 1 day
  max_ttl     = 604800   # 7 days
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }

    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

resource "aws_cloudfront_cache_policy" "static_assets" {
  name        = "${var.app_name}-${var.environment}-static-assets"
  comment     = "Aggressive caching for static assets (JS, CSS, images)"
  default_ttl = 2592000   # 30 days
  max_ttl     = 31536000  # 365 days
  min_ttl     = 86400     # 1 day

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }

    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

# ============================================================================
# CloudFront Response Headers Policy (Security)
# ============================================================================

resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name    = "${var.app_name}-${var.environment}-security-headers"
  comment = "Security headers for ${var.app_name}"

  security_headers_config {
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }

    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }

    content_security_policy {
      content_security_policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.realm.mongodb.com https://*.mongodb-realm.com;"
      override                = true
    }
  }
}

# ============================================================================
# CloudFront Function - URL Rewriting for SPA
# ============================================================================

resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.app_name}-${var.environment}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite URLs for SPA routing"
  publish = true

  code = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // If the URI has a file extension, serve it as-is
      if (uri.includes('.')) {
        return request;
      }

      // For all other paths, rewrite to index.html (SPA routing)
      if (!uri.startsWith('/static/') && !uri.startsWith('/assets/')) {
        request.uri = '/index.html';
      }

      return request;
    }
  EOF
}
