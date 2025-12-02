resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "baselabs-repo"
  description   = "Docker repository for baselabs"
  format        = "DOCKER"

  depends_on = [google_project_service.apis]
}
