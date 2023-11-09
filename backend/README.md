# Pre-Requisites

- ## Environment variable
    For dev env, please use ```.env``` file.
    
    For ```docker``` container env, please use ```.env.docker``` file.
    
    For ```docker compose``` env, please use ```.env.dokcer-compose``` file.
    - DATABASE_NAME=<value used in .env.postgres for POSTGRES_DB>
    - DATABASE_USER=<value used in .env.postgres for POSTGRES_USER>
    - DATABASE_PASSWORD=<value used in .env.postgres for POSTGRES_PASSWORD>
    - DATABASE_HOST=<host>
    - DATABASE_PORT=5432
    - SECRET_KEY=<secret key>

    Values for DATABASE_HOST
    - .env --> localhost | relevant hostname
    - .env.docker --> host.docker.internal | relevant hostname
    - .env.docker-compose --> postgres

# Initialize project

- Create server manually in PgAdmin page (if not all)

    - New Server details
        - Name: Value of postgres container name
        - Host: value of POSTGRES_HOST in .env<*> of backend app
        - Maintainence DB: postgres
        - User: value of POSTGRES_USER in .env.postgres
        - Password : value of POSTGRES_PASSWORD in .env.postgres
    - Create empty 'expensetracker' database manually in PgAdmin page (if it does not exist)

**_Note:_** If the backend app is running as a container (using docker/docker compose), then you need to login to the conatiner to execute the below commands
```bash
docker exec -it <backend container name/id> /bin/sh
```
- Create migration files
    ```bash
    python3 manage.py makemigrations
    python3 manage.py makemigrations --merge
    ```
- Migrate 'users' app
    ```bash
    python3 manage.py migrate users
    ```
- Migrate 'all' apps
    ```bash
    python3 manage.py migrate
    ```
- Create django superuser
    ```bash
    python3 manage.py createsuperuser
    ```
- Login to Django admin page
- Validate that superuser object exists for model 'Auth_Token.Token', if not then create a new one manually
- Create new CustomerUser and corresponding 'Auth_token.Token'

# Build Docker image
```bash
./build_docker_image.sh
```

# Run application as a Container
```bash
docker run -d \
  --name backend \
  -p 8000:8000 \
  --add-host=host.docker.internal:host-gateway \
  --env-file .env.docker \
  expensetracker/backend:latest
```

# Access Admin page
Admin page can be accessed using URL: http://localhost:8000/admin