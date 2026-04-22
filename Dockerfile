# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Dependencies only
COPY package*.json ./
RUN npm ci

# App source
COPY . .

# test
FROM base as test
ENV NODE_ENV=dev
RUN npm test -- --ci --forceExit

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy everything from base
COPY --from=base /app /app

EXPOSE 3000

# Run entry point
CMD ["node", "src/index.js"]
