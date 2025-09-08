# Генерация типов API для фронтенда

## 🚀 Быстрый старт

### 1. Запуск сервера
```bash
npm run start:dev
```

### 2. Генерация типов
```bash
npm run generate-types
```

Результат: `types/api.ts` с полными типами из OpenAPI спецификации.

## 📁 Структура файлов

```
types/
├── api.ts                 # Автоматически сгенерированные типы
└── frontend-example.ts    # Примеры использования во фронтенде
```

## 💻 Использование во фронтенде

### Импорт типов
```typescript
import { paths, components } from './types/api';

// Типы для ответов API
type ColorOptions = paths['/api/color-guide/options']['get']['responses'][200]['content']['application/json'];
type AnimalResponse = paths['/api/animal']['post']['responses'][201]['content']['application/json'];
```

### Пример с React
```typescript
const AnimalForm = () => {
  const [colors, setColors] = useState<ColorOptions>([]);
  
  useEffect(() => {
    fetch('/api/color-guide/options')
      .then(res => res.json())
      .then(setColors);
  }, []);

  return (
    <select>
      {colors.map(color => (
        <option key={color.value} value={color.value}>
          {color.title}
        </option>
      ))}
    </select>
  );
};
```

## 🔄 Автоматическое обновление

При изменении API (добавлении новых endpoints, изменении DTO) просто запустите:

```bash
npm run generate-types
```

Типы автоматически обновятся в соответствии с текущей OpenAPI спецификацией.

## 📋 Доступные endpoints

- `GET /api/color-guide/options` - опции цветов
- `GET /api/fur-guide/options` - опции типов шерсти  
- `GET /api/species-guide/options` - опции видов
- `GET /api/breed-guide/options` - опции пород
- `POST /api/animal` - создание животного
- `GET /api/animal` - список животных
- `PATCH /api/animal/{id}` - обновление животного
- `DELETE /api/animal/{id}` - удаление животного

## 🛠️ Технические детали

- **Генератор**: `openapi-typescript`
- **Источник**: `http://localhost:3000/api-json`
- **Формат**: TypeScript interfaces
- **Обновление**: Ручное (по команде)

## 📖 Swagger UI

Для интерактивного тестирования API:
http://localhost:3000/api
