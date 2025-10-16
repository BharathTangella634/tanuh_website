# Multi-stage Dockerfile for building and serving the Vite React app with Apache HTTPD

# 1) Builder stage: install deps and build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better cache)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# 2) Runtime stage: Apache HTTPD serving static files
FROM httpd:2.4-alpine AS runtime

# Enable SPA routing via .htaccess by allowing overrides and enabling mod_rewrite
# - Un-comment (or add) the rewrite module
# - Allow .htaccess overrides in the DocumentRoot
RUN sed -i 's%^#\?LoadModule rewrite_module modules/mod_rewrite.so%LoadModule rewrite_module modules/mod_rewrite.so%' /usr/local/apache2/conf/httpd.conf \
  && sed -i 's/AllowOverride None/AllowOverride All/i' /usr/local/apache2/conf/httpd.conf \
  && echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf \
  && echo "Include conf/extra/logfilter.conf" >> /usr/local/apache2/conf/httpd.conf

# Copy Apache log filter to exclude docker healthcheck noise
COPY apache/logfilter.conf /usr/local/apache2/conf/extra/logfilter.conf

# Copy built assets to Apache's document root
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Add .htaccess for SPA fallback (rewrite non-file requests to /index.html)
COPY apache.htaccess /usr/local/apache2/htdocs/.htaccess

EXPOSE 80

# Healthcheck: use a HEAD-like probe and tag with a unique User-Agent; quiet output
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider -U docker-healthcheck http://127.0.0.1/ || exit 1

# Start Apache in the foreground
CMD ["httpd-foreground"]
