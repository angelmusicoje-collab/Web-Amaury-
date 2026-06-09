# syntax=docker/dockerfile:1.6

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Copia archivos de manifiesto primero para aprovechar la cache
COPY package.json package-lock.json* ./
RUN npm install

# Copia el resto del codigo y construye el sitio estatico
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine AS runtime

# Quita el default vhost de nginx y mete el nuestro
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mueve el build de Astro al docroot de nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
