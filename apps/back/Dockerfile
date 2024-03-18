FROM node:20.11.1-alpine3.19 AS base

# BUILD

FROM base AS builder
WORKDIR /app

COPY . .

RUN corepack enable pnpm 

WORKDIR /app/apps/back

RUN pnpm install
RUN pnpm run build

ENV NODE_ENV production

WORKDIR /app/apps/back/build

RUN pnpm install

EXPOSE 3333

ENV TZ UTC
ENV PORT 3333
ENV HOST localhost
ENV LOG_LEVEL info
ENV APP_KEY MHJMaRAtWfDcuHTLqgwSPRCqfqzrH8sC
ENV NODE_ENV production

CMD ["node", "bin/server.js"]