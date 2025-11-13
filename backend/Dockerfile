FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY prisma ./prisma

COPY . .

EXPOSE 3001

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
