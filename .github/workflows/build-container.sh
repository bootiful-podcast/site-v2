#!/usr/bin/env bash
# builds the spa and publishes it as an nginx container image, IMAGE_NAME. the pipeline
# repository (bootiful-podcast/pipeline) deploys it to cloud foundry.
set -euo pipefail

echo "the root directory is ${ROOT_DIR}."
cd "$ROOT_DIR"
rm -rf dist build
npm ci
npm run build
mkdir -p build/public
cp .github/workflows/nginx-buildpack-config/* build
cp -r dist/* build/public
cd build

pack build "$IMAGE_NAME" \
  --builder paketobuildpacks/builder-jammy-base \
  --buildpack paketo-buildpacks/nginx \
  --env PORT=8080 \
  ${PUBLISH:+--publish}
