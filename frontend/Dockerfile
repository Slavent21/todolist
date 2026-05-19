# Stage 1: Сборка
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Собираем проект (создаст папку dist)
RUN npm run build

# Stage 2: Раздача через Nginx
FROM nginx:stable-alpine

# Копируем конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из первого этапа
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]