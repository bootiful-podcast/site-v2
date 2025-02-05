#!/usr/bin/env bash
export APP_NAME=bootiful-podcast-site
export GCLOUD_PROJECT=joshlong
export IMAGE_NAME="us-docker.pkg.dev/${GCLOUD_PROJECT}/bootiful-podcast-artifact-registry/${APP_NAME}"
export ROOT_DIR=`pwd`
$ROOT_DIR/.github/workflows/build_container.sh