#!/usr/bin/env bash
# builds the container image the way the github actions workflow does, into the local docker
# daemon instead of publishing it. run it with: docker run --rm -p 8080:8080 site
set -euo pipefail
export IMAGE_NAME=site
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
export ROOT_DIR
"$ROOT_DIR/.github/workflows/build-container.sh"
