# Dockerfile for Express backend
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy the entire questionnaire-app so backend can import ../mysql_explorer/db.js
COPY questionnaire-app /app/questionnaire-app

# Install only backend dependencies
WORKDIR /app/questionnaire-app/backend
RUN npm install --only=production --no-audit --no-fund

EXPOSE 3001
CMD ["npm", "start"]
