FROM node:22-slim AS build

ARG OBSIDIAN_EMAIL
ARG OBSIDIAN_PASSWORD
ARG OBSIDIAN_VAULT
ARG OBSIDIAN_KEY

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN npm install -g obsidian-headless

COPY package.json package-lock.json ./
RUN npm ci

COPY quartz/ ./quartz/
COPY quartz.lock.json quartz.config.yaml ./

RUN npx quartz plugin install

COPY . .

RUN ob login --email $OBSIDIAN_EMAIL --password $OBSIDIAN_PASSWORD && \
    ob sync-setup --vault "$OBSIDIAN_VAULT" --path ./content --password $OBSIDIAN_KEY && \
    ob sync-config --mode pull-only --path ./content && \
    ob sync --path ./content

RUN npx quartz build

FROM caddy:alpine
COPY --from=build /app/public /srv/garden
COPY Caddyfile /etc/caddy/Caddyfile
