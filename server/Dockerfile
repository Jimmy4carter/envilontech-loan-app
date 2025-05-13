# Build stage
FROM node:16 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install server dependencies
RUN npm install

# Install client dependencies
WORKDIR /app/client
RUN npm install

# Copy application files
WORKDIR /app
COPY server ./server
COPY client ./client

# Build the client
WORKDIR /app/client
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Copy server files
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV TZ=Africa/Lagos

EXPOSE 5000

CMD ["node", "server/app.js"]