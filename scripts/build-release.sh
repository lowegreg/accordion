#!/usr/bin/env zsh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PLUGIN_SLUG="accordion"
VERSION="$(sed -n "s/.*Version:[[:space:]]*\([^[:space:]]*\).*/\1/p" "${ROOT_DIR}/accordion.php" | head -n 1)"
BUILD_ROOT="${ROOT_DIR}/build"
STAGE_DIR="${BUILD_ROOT}/${PLUGIN_SLUG}"
ZIP_PATH="${BUILD_ROOT}/${PLUGIN_SLUG}-${VERSION}.zip"

mkdir -p "${BUILD_ROOT}"
rm -rf "${STAGE_DIR}" "${ZIP_PATH}"

rsync -a "${ROOT_DIR}/" "${STAGE_DIR}/" \
	--exclude ".git" \
	--exclude ".DS_Store" \
	--exclude "build" \
	--exclude "scripts"

cd "${BUILD_ROOT}"
zip -rq "${ZIP_PATH}" "${PLUGIN_SLUG}"
rm -rf "${STAGE_DIR}"

echo "Release package created: ${ZIP_PATH}"
