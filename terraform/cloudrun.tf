# ---------------------------------------------------------
# BACKEND SERVICE
# ---------------------------------------------------------
resource "google_cloud_run_v2_service" "backend" {
  name     = "baselabs-backend"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.repo.name}/backend:v1"

      ports {
        container_port = 3001
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      env {
        name  = "JWT_SECRET"
        value = var.jwt_secret
      }
      env {
        name  = "DATABASE_URL"
        value = "postgresql://${google_sql_user.users.name}:${var.db_password}@localhost/${google_sql_database.database.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.postgres.connection_name]
      }
    }
  }

  depends_on = [google_artifact_registry_repository.repo, google_sql_database_instance.postgres]
}

resource "google_cloud_run_service_iam_member" "public_backend" {
  service  = google_cloud_run_v2_service.backend.name
  location = google_cloud_run_v2_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ---------------------------------------------------------
# FRONTEND SERVICE
# ---------------------------------------------------------
resource "google_cloud_run_v2_service" "frontend" {
  name     = "baselabs-frontend"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.repo.name}/frontend:v2"

      ports {
        container_port = 3000
      }

      env {
        name  = "NEXT_PUBLIC_API_URL"
        value = google_cloud_run_v2_service.backend.uri
      }
    }
  }

  depends_on = [google_artifact_registry_repository.repo, google_cloud_run_v2_service.backend]
}

resource "google_cloud_run_service_iam_member" "public_frontend" {
  service  = google_cloud_run_v2_service.frontend.name
  location = google_cloud_run_v2_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
