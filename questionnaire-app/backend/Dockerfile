# Dockerfile for Express backend
FROM node:20-alpine

# Set backend working directory (will be created if it doesn't exist)
WORKDIR /app/questionnaire-app/backend

# Copy only package manifests first to leverage Docker layer cache
COPY questionnaire-app/backend/package*.json ./
# Install production dependencies deterministically
RUN npm ci --only=production --no-audit --no-fund

# Copy the entire questionnaire-app so backend can import ../mysql_explorer/db.js
COPY questionnaire-app /app/questionnaire-app

EXPOSE 3001
CMD ["npm", "start"]
