#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api-json';
const OUTPUT_DIR = path.join(__dirname, '..', 'types');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'api.ts');

async function generateTypes() {
  try {
    console.log('🚀 Генерация типов из OpenAPI спецификации...');
    
    // Создаем директорию если не существует
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Генерируем типы
    execSync(`npx openapi-typescript ${API_URL} -o ${OUTPUT_FILE}`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log(`✅ Типы успешно сгенерированы: ${OUTPUT_FILE}`);
    console.log('📝 Теперь можно импортировать типы во фронтенд:');
    console.log(`   import { paths } from './types/api';`);
    
  } catch (error) {
    console.error('❌ Ошибка генерации типов:', error.message);
    console.log('💡 Убедитесь что сервер запущен на http://localhost:3000');
    process.exit(1);
  }
}

generateTypes();
