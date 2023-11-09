# Pre-Requisites

- ## Environment variable
    For dev env, please use ```.env``` file.
    
    For ```docker``` container env, please use ```.env.docker``` file.
    
    For ```docker compose``` env, please use ```.env.dokcer-compose``` file.
    - BACKEND_HOST
    - BACKEND_PORT

    Values for BACKEND_HOST
    - .env --> localhost | relevant hostname
    - .env.docker --> host.docker.internal | relevant hostname
    - .env.docker-compose --> backend

# Build Docker image
```bash
./build_docker_image.sh
```

# Run application as a Container
```bash
docker run -d \
  --name frontend \
  -p 3000:3000 \
  --env-file .env.docker
  --add-host=host.docker.internal:host-gateway \
  expensetracker/frontend:latest
```

# Access Admin page
Admin page can be accessed using URL: http://localhost:3000