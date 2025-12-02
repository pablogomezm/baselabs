variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "jwt_secret" {
  description = "Secret to sign JWT tokens"
  type        = string
  sensitive   = true
}
