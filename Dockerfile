FROM node:20.11.1-alpine3.19 AS base

# DEPENDENCIES

FROM base AS deps
WORKDIR /app

COPY pnpm-lock.yaml .

RUN corepack enable pnpm 
RUN pnpm install -r

# BUILD

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm 
RUN pnpm run -r --parallel build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public