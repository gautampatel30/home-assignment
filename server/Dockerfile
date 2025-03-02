# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory for the backend
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port for the backend
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
