FROM node:20.11.1-alpine3.19 AS base

WORKDIR /app

RUN corepack enable pnpm 

COPY . .

WORKDIR /app/apps/back

RUN pnpm install

ENV NODE_ENV production

EXPOSE 3333

CMD pnpm run dev