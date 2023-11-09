# Initialize project

- Create server manually in PgAdmin page (if not all)
- Create empty 'expensetracker' database manually in PgAdmin page
- Set correct DB credentials in `settings.py`
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
- Validate that superuser object exists for model 'Auth_Token.Token'
- Create new CustomerUser and corresponding Auth_token.Token

# Build Docker image
```bash
./build_docker_image.sh
```

# Run application
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