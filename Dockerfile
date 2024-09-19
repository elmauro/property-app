# Stage 1: Builder Stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
COPY yarn*.lock ./

# Install dependencies
RUN yarn install

# Copy the entire app
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Nginx to serve the build
FROM nginx:1.19.0

# Set working directory to Nginx's default html folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static resources
RUN rm -rf ./*

# Copy the build from the first stage
COPY --from=builder /app/build .

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
