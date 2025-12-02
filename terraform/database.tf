resource "google_sql_database_instance" "postgres" {
  name             = "baselabs-db-instance-${random_id.db_name_suffix.hex}"
  database_version = "POSTGRES_15"
  region           = var.region

  deletion_protection = false

  settings {
    tier = "db-f1-micro"

    availability_type = "ZONAL"

    ip_configuration {
      ipv4_enabled = true
    }
  }

  depends_on = [google_project_service.apis]
}

resource "google_sql_database" "database" {
  name     = "baselabs_db"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "users" {
  name     = "baselabs_user"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}
