FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

EXPOSE 3001

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
