# Docker Setup для API Poteriashki

## Обзор

Проект включает в себя два Dockerfile:
- `Dockerfile` - для development окружения
- `Dockerfile.prod` - для production окружения с многоэтапной сборкой

## Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=poteriashki_db

# Application Configuration
PORT=3000
NODE_ENV=development

# Build Configuration
BUILD_TARGET=development
# BUILD_TARGET=production

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./static
```

## Сборка и запуск

### Development окружение

```bash
# Сборка development образа
docker-compose build

# Запуск сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f poteriashki
```

### Production окружение

```bash
# Установка BUILD_TARGET=production в .env
BUILD_TARGET=production

# Сборка production образа
docker-compose build

# Запуск сервисов
docker-compose up -d
```

### Использование production Dockerfile напрямую

```bash
# Сборка production образа
docker build -f Dockerfile.prod -t poteriashki:prod .

# Запуск контейнера
docker run -d \
  --name poteriashki_prod \
  -p 3000:3000 \
  --env-file .env \
  poteriashki:prod
```

## Структура Docker

### Development Dockerfile
- Использует `node:lts-alpine` как базовый образ
- Устанавливает все зависимости (включая devDependencies)
- Создает пользователя без прав root для безопасности
- Включает health check
- Оптимизирован для разработки

### Production Dockerfile
- Использует многоэтапную сборку
- Builder stage компилирует TypeScript
- Production stage содержит только необходимые файлы
- Минимальный размер образа
- Только production зависимости

## Оптимизации

### .dockerignore
Исключает ненужные файлы из контекста сборки:
- `node_modules`
- `.git`
- `.env`
- `dist`
- Временные файлы

### Health Checks
- База данных: проверка готовности PostgreSQL
- Приложение: HTTP health check на `/health`

### Безопасность
- Пользователь без прав root
- Минимальные права доступа
- Только необходимые системные пакеты

## Мониторинг

```bash
# Проверка состояния сервисов
docker-compose ps

# Просмотр логов
docker-compose logs -f

# Проверка health check
docker inspect poteriashki | grep Health -A 10
```

## Troubleshooting

### Проблемы с правами доступа
```bash
# Исправление прав на скрипты

```

### Проблемы с базой данных
```bash
# Проверка состояния БД
docker-compose exec poteriashki_db pg_isready -U postgres

# Перезапуск БД
docker-compose restart poteriashki_db
```

### Очистка
```bash
# Остановка и удаление контейнеров
docker-compose down

# Удаление образов
docker-compose down --rmi all

# Очистка volumes
docker-compose down -v
```
