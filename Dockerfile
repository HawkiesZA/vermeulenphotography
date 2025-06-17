# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Set environment variables
ENV NODE_ENV=development
ENV NO_DB=1

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4321
ENV HOST=0.0.0.0

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 4321

# Start the application
CMD ["node", "./dist/server/entry.mjs"]