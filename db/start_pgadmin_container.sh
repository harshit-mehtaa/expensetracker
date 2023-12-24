#!/bin/bash

docker run -d \
  --name pgadmin \
  -p 82:80 \
  --env-file .env.pgadmin \
  --volume ../pgadmin-data:/var/lib/pgadmin \
  dpage/pgadmin4