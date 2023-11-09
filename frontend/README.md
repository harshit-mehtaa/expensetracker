# Build Docker image
```bash
./build_docker_image.sh
```

# Run application
```bash
docker run -d \
  --name frontend \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  expensetracker/frontend:latest
```

# Access Admin page
Admin page can be accessed using URL: http://localhost:3000