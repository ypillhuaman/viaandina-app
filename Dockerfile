# Etapa 1: Build Angular app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/viaandina-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
