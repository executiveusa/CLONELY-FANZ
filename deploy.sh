#!/bin/bash

# Build the application
npm run build

# Set up Google Cloud credentials
gcloud auth activate-service-account --key-file=service-account.json

# Set the project ID
gcloud config set project $VITE_GOOGLE_CLOUD_PROJECT

# Upload to Google Cloud Storage
gsutil -m rsync -r dist gs://$VITE_GOOGLE_CLOUD_BUCKET

# Set public access
gsutil -m acl ch -r -u AllUsers:R gs://$VITE_GOOGLE_CLOUD_BUCKET

echo "Deployment complete!"
