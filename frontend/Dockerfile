# Stage 1: Build React + TypeScript App
FROM node:18-slim AS build

# Imposta cartella di lavoro
WORKDIR /app

# Copia solo i file necessari per installare le dipendenze
COPY package.json yarn.lock ./

# Installa le dipendenze (usa npm anche se c'è yarn.lock, per aggirare peerDeps)
RUN npm install --legacy-peer-deps

# Copia solo i file sorgente necessari
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
#COPY .env ./

# Costruisce l'app (React crea la cartella `build`)
RUN npm run build

# Stage 2: Serve con NGINX
FROM nginx:stable-alpine

# Pulisce HTML default di NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia i file della build React dalla fase precedente
COPY --from=build /app/build /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80

# Riduce i log a output minimo
ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

# Comando finale
CMD ["nginx", "-g", "daemon off;"]
