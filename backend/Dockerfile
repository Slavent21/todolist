# Используем полную версию образа, в ней проще работать с зависимостями
FROM node:20-bookworm

# Устанавливаем OpenSSL и сертификаты (нужны для Prisma)
RUN apt-get update -y && apt-get install -y openssl ca-certificates

ENV DB_URL="postgresql://a1:postgres@host.docker.internal:5432/todolist?schema=public"

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]