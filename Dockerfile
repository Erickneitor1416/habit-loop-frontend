FROM node:20-alpine AS base
RUN apk add --no-cache g++ libc6-compat make py3-pip

WORKDIR /app

COPY package*.json ./

EXPOSE 3001

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm ci \
    && npm run build

FROM base AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 \
    && mkdir .next \
    && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD ["npm", "start"]

FROM base AS dev
ENV NODE_ENV=development
ENV PORT=3001
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
