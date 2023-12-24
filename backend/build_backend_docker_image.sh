#!/bin/bash

IMAGE_NAME="expensetracker/backend"
IMAGE_TAG=$(git log -1 --pretty=%h)
TAG_LATEST="latest"

docker build -t "$IMAGE_NAME:$IMAGE_TAG" -t "$IMAGE_NAME:$TAG_LATEST" .