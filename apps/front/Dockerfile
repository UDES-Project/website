FROM node:20.11.1-alpine3.19 AS base

# BUILD

FROM base AS builder
WORKDIR /app

COPY . .

RUN corepack enable pnpm 

WORKDIR /app/apps/front

RUN pnpm install
RUN pnpm run build

#RUN rm -rf /app/apps/back

ENV NODE_ENV production
ENV NEXT_PUBLIC_API_HOST umes.ddns.net

RUN corepack enable pnpm 

EXPOSE 3000

CMD ["pnpm", "run", "start"]