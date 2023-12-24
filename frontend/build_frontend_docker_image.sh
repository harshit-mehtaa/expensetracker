#!/bin/bash

IMAGE_NAME="expensetracker/frontend"
IMAGE_TAG=$(git log -1 --pretty=%h)
TAG_LATEST="latest"
TAG_DEV="dev"

docker build -t "$IMAGE_NAME:$IMAGE_TAG" -t "$IMAGE_NAME:$TAG_LATEST" -t "$IMAGE_NAME:$TAG_DEV" .