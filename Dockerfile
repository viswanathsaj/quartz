FROM node:22-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx quartz build

FROM caddy:alpine
COPY --from=build /app/public /srv/garden
COPY Caddyfile /etc/caddy/Caddyfile
