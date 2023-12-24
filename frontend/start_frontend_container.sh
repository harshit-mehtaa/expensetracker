#!/bin/bash

TAG="dev"

if [ ! -z "$1" ]; then
  TAG=$1
fi

docker run -d \
  --name frontend \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  expensetracker/frontend:$TAG