# Base image: Node.js 21
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Install `serve` to serve the app
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the production server
CMD ["serve", "-s", "dist", "-l", "3000"]
