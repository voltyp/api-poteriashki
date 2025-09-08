// Пример использования сгенерированных типов во фронтенде
import { paths, components } from './api';

// Типы для API endpoints
type ColorOptionsResponse = paths['/api/color-guide/options']['get']['responses'][200]['content']['application/json'];
type FurOptionsResponse = paths['/api/fur-guide/options']['get']['responses'][200]['content']['application/json'];
type SpeciesOptionsResponse = paths['/api/species-guide/options']['get']['responses'][200]['content']['application/json'];
type BreedOptionsResponse = paths['/api/breed-guide/options']['get']['responses'][200]['content']['application/json'];

// Типы для создания животных
type CreateAnimalRequest = paths['/api/animal']['post']['requestBody']['content']['multipart/form-data'];
type CreateAnimalResponse = paths['/api/animal']['post']['responses'][201]['content']['application/json'];

// Типы для создания guide записей
type CreateColorRequest = paths['/api/color-guide']['post']['requestBody']['content']['application/json'];
type CreateFurRequest = paths['/api/fur-guide']['post']['requestBody']['content']['application/json'];
type CreateSpeciesRequest = paths['/api/species-guide']['post']['requestBody']['content']['application/json'];
type CreateBreedRequest = paths['/api/breed-guide']['post']['requestBody']['content']['application/json'];

// Пример использования в React компоненте
export const useApiTypes = () => {
  // Получение опций цветов
  const getColorOptions = async (): Promise<ColorOptionsResponse> => {
    const response = await fetch('/api/color-guide/options');
    return response.json();
  };

  // Получение опций типов шерсти
  const getFurOptions = async (): Promise<FurOptionsResponse> => {
    const response = await fetch('/api/fur-guide/options');
    return response.json();
  };

  // Получение опций видов
  const getSpeciesOptions = async (): Promise<SpeciesOptionsResponse> => {
    const response = await fetch('/api/species-guide/options');
    return response.json();
  };

  // Получение опций пород
  const getBreedOptions = async (): Promise<BreedOptionsResponse> => {
    const response = await fetch('/api/breed-guide/options');
    return response.json();
  };

  // Создание животного
  const createAnimal = async (data: FormData): Promise<CreateAnimalResponse> => {
    const response = await fetch('/api/animal', {
      method: 'POST',
      body: data
    });
    return response.json();
  };

  return {
    getColorOptions,
    getFurOptions,
    getSpeciesOptions,
    getBreedOptions,
    createAnimal
  };
};

// Пример использования типов для форм
export interface AnimalFormData {
  categoryCode: 'NEW_CAT' | 'NEW_DOG';
  userCode: string;
  speciesCode: string;
  breedCode: string;
  furCode: string;
  colorCode: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birthdate: string;
  status: 'FINDING_OWNER' | 'LOST' | 'OWNER_FOUND' | 'QUARANTINE' | 'CHECK' | 'RAINBOW_ROAD' | 'DELETED';
  placeDiscovery: string;
  foundDate?: string;
  specialFeatures?: string;
  furtherInformation?: string;
  isNeedFoster: boolean;
  curatorId?: number;
  photos?: File[];
}
