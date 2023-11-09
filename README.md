# expensetracker
Expense Tracker

# Manage application using docker-compose

## Pre-Requisites

- ### Environment variable
    Please check individual ```README.md``` files under specific app directories
    - #### Postgres DB
        Create ```.env.postgres``` file under ```db/``` directory with the below mentioned properties
        - POSTGRES_USER
        - POSTGRES_PASSWORD
        - POSTGRES_DB
    
    - #### PgAdmin UI
        Create ```.env.pgadmin``` file under ```db/``` directory with the below mentioned properties
        - PGADMIN_DEFAULT_EMAIL
        - PGADMIN_DEFAULT_PASSWORD
    
    - #### Backend
        Create ```.env.docker-compose``` file under ```backend/``` directory with the below mentioned properties
        - DATABASE_NAME
        - DATABASE_USER
        - DATABASE_PASSWORDPOSTGRES_PASSWORD>
        - DATABASE_HOST
        - DATABASE_PORT
        - SECRET_KEY
    - #### Frontend
        Create ```.env.docker-compose``` file under ```frontend/``` directory with the below mentioned properties
        - BACKED_HOST
        - BACKEND_PORT

### Start application
```bash
docker compose up -d
```

### View logs
```bash
docker compose logs -t -f
```
### Stop application
```bash
docker compose down
```