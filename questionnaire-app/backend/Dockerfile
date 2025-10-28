# # Dockerfile for Express backend
# FROM node:20-alpine

# # Set backend working directory (will be created if it doesn't exist)
# WORKDIR /app/questionnaire-app/backend

# # Copy only package manifests first to leverage Docker layer cache
# COPY questionnaire-app/backend/package*.json ./
# # Install production dependencies without requiring a lockfile (avoids root lockfile conflicts)
# RUN npm install --omit=dev --no-audit --no-fund

# # Copy the entire questionnaire-app so backend can import ../mysql_explorer/db.js
# COPY questionnaire-app /app/questionnaire-app

# EXPOSE 3001
# CMD ["npm", "start"]


# Backend Dockerfile





# FROM node:20-alpine

# WORKDIR /app

# # Copy only backend package files first for caching
# COPY backend/package*.json ./

# RUN npm install --omit=dev --no-audit --no-fund

# # ✅ Copy backend, mysql_explorer, and any shared folders
# COPY backend ./backend
# COPY mysql_explorer ./mysql_explorer


# # Expose backend port
# EXPOSE 3001

# # ✅ Start backend with correct path
# CMD ["node", "backend/server.js"]





# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy only backend package files first for caching
COPY backend/package*.json ./backend/ 
# --- FIX: Ensure npm install runs in the backend context ---
WORKDIR /app/backend 
RUN npm install --omit=dev --no-audit --no-fund
# --- END FIX ---

# Go back to the app root for subsequent copies if needed, or stay in backend
WORKDIR /app 

# ✅ Copy backend, mysql_explorer, and any shared folders
COPY backend ./backend
COPY mysql_explorer ./mysql_explorer

# --- ADD THIS LINE ---
# Copy the questionnaire JSON from the host's src/assets 
# directly into the backend directory within the container.
# Assumes Docker build context is the project root (questionnaire-app).
COPY src/assets/questionnaire.json ./backend/
# --- END ADDITION ---

# Expose backend port
EXPOSE 3001

# ✅ Start backend using the path relative to the final WORKDIR (/app)
CMD ["node", "backend/server.js"]