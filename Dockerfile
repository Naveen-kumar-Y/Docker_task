# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Dependencies only
COPY package*.json ./
RUN npm ci

# App source
COPY . .

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy everything from base
COPY --from=base /app /app

EXPOSE 3000

# Run entry point
CMD ["node", "src/index.js"]
