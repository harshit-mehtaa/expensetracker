#!/bin/bash

docker run -d \
  --name frontend \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  expensetracker/frontend:latest