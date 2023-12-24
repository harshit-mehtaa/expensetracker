#!/bin/bash

docker run -d \
  --name postgres-container \
  -p 5432:5432 \
  --env-file .env.postgres \
  --volume=${PWD}/../pgdata:/var/lib/postgresql/data \
  postgres