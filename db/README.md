# Pre-Requisites
- ## Environment variable
    Create ```.env.postgres``` file under db/ directory with the below mentioned properties
    - ### Postgres
        - POSTGRES_USER
        - POSTGRES_PASSWORD
        - POSTGRES_DB
    - ### PgAmin UI
        Create ```.env.pdadmin``` file under db/ directory with the below mentioned properties
        - PGADMIN_DEFAULT_EMAIL
        - PGADMIN_DEFAULT_PASSWORD

# Run Postgres DB as a Container
```bash
docker run -d
    --name postgres-container
    -p 5432:5432
    --env-file .env.postgres
    postgres
```

# Run PgAdmin UI as a Container
```bash
docker run -d
    --name pgadmin
    -p 82:80
    --env-file .env.pgadmin
    dpage/pgadmin4
```

# Access PgAdmin UI page
Admin page can be accessed using URL: http://localhost:82. Use email and password passed as part of ```.env.pgamin``` file.