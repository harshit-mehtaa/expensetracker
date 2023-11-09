# expensetracker
Expense Tracker

# Manage application using docker-compose

## Pre-Requisites

- ### Environment variable
    
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
        - DATABASE_NAME=<value used in .env.postgres for POSTGRES_DB>
        - DATABASE_USER=<value used in .env.postgres for POSTGRES_USER>
        - DATABASE_PASSWORD=<value used in .env.postgres for POSTGRES_PASSWORD>
        - DATABASE_HOST=postgres
        - DATABASE_PORT=5432
        - SECRET_KEY=<secret key>

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