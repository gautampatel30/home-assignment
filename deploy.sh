#!/bin/bash

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found. Please install AWS CLI."
    exit 1
fi

# Check if Elastic Beanstalk CLI is installed
if ! command -v eb &> /dev/null
then
    echo "Elastic Beanstalk CLI not found. Please install it."
    exit 1
fi

# Set AWS region and app names
AWS_REGION="us-east-1"  # Change to your region
EB_APP_NAME="my-app"  # Your Elastic Beanstalk App Name
EB_ENV_NAME="my-app-env"  # Your Elastic Beanstalk Environment Name
S3_BUCKET_NAME="my-app-frontend-bucket"  # Your S3 Bucket for React app
DOCKER_FRONTEND_PATH="./client"  # Path to your React app (frontend)
DOCKER_BACKEND_PATH="./server"  # Path to your backend app (Node.js)

# Deploy Frontend (React App) to S3
echo "Deploying frontend (React app) to S3..."

# Build the React app
cd $DOCKER_FRONTEND_PATH
npm run build

# Sync the dist directory with your S3 bucket (not build/)
aws s3 sync dist/ s3://$S3_BUCKET_NAME --region $AWS_REGION

# Go back to the root directory
cd ..

# Deploy Backend (Node.js App) to Elastic Beanstalk
echo "Deploying backend (Node.js app) to Elastic Beanstalk..."

# Initialize Elastic Beanstalk app if not already done
eb init -p docker --region $AWS_REGION

# Create Elastic Beanstalk environment if not already done
eb create $EB_ENV_NAME --region $AWS_REGION --instance_type t2.micro

# Deploy the Dockerized backend to Elastic Beanstalk
eb deploy --region $AWS_REGION

# Get the URL of the deployed backend server
BACKEND_URL=$(eb open --region $AWS_REGION | grep -oP '(?<=https://)[^ ]+')

echo "Frontend deployed to S3 at: https://$S3_BUCKET_NAME.s3.amazonaws.com"
echo "Backend deployed to Elastic Beanstalk at: https://$BACKEND_URL"

# Optional: Run tests after deployment (uncomment if needed)
# echo "Running tests..."
# npm test

echo "Deployment complete!"
