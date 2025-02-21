#!/bin/bash

# Publish script for next-cookie-popup

# Exit on error
set -e

# Navigate to the package directory
cd packages/next-cookie-popup

# Check if the version is bumped
CURRENT_VERSION=$(node -p "require('./package.json').version")
LATEST_NPM_VERSION=$(npm view next-cookie-popup version || echo "0.0.0")

if [ "$CURRENT_VERSION" == "$LATEST_NPM_VERSION" ]; then
  echo "Error: The version in package.json ($CURRENT_VERSION) is not bumped. Please update the version before publishing."
  exit 1
fi

# Check if the working directory is clean
if [[ -n $(git status --porcelain) ]]; then
  echo "Error: The working directory is not clean. Please commit or stash your changes before publishing."
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the package
echo "Building the package..."
npm run build

# Verify the build output
if [[ ! -d "dist" ]]; then
  echo "Error: The dist folder is missing. Build failed."
  exit 1
fi

# Publish to npm
echo "Publishing to npm..."
npm publish --access public --dry-run

# Tag the release in Git
echo "Tagging the release in Git..."
git tag v$CURRENT_VERSION
git push origin v$CURRENT_VERSION

echo "Successfully published next-cookie-popup@$CURRENT_VERSION to npm!"
