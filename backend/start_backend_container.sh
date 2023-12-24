#!/bin/bash

docker run -d \
  --name backend \
  -p 8000:8000 \
  --add-host=host.docker.internal:host-gateway \
  --env-file .env.docker \
  expensetracker/backend:latest