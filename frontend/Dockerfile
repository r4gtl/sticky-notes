
# Stage 1: Build React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json yarn.lock ./

# Install dependencies using npm to avoid peerDeps issues
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Ensure compatible AJV version for building
RUN npm install ajv@6.12.6 ajv-keywords@3.5.2 --legacy-peer-deps

# Build React application
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:stable-alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copia il default.conf personalizzato
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port for HTTP
EXPOSE 80

# Quiet Nginx entrypoint logs
#ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]