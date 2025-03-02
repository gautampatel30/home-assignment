# Use Node.js as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# **Build the project (this generates the `dist` folder)**
RUN npm run build

# **Expose the Vite preview port (default 4173)**
EXPOSE 4173

# **Run Vite preview to serve the built files**
CMD ["npm", "run", "preview"]
