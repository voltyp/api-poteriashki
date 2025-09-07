FROM node:lts-alpine

# Установка системных зависимостей
RUN apk update && apk add --no-cache \
    bash \
    coreutils

# Установка глобальных npm пакетов
RUN npm i -g @nestjs/cli typescript ts-node env-cmd --production

# Создание пользователя без прав root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Копирование и установка зависимостей
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Изменение владельца файлов
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Открытие порта
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Запуск приложения
CMD ["npm", "run", "start:prod"]
