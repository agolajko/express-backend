# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and lock file
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build
RUN pnpm run generate

# Expose the port your app runs on (adjust if different)
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]