/** Статусы животных в системе */
export enum AnimalStatus {
  /** Ищет хозяина */
  FindingOwner = 'FINDING_OWNER',
  /** Потерян */
  Lost = 'LOST',
  /** Хозяин найден */
  OwnerFound = 'OWNER_FOUND',
  /** На карантине */
  Quarantine = 'QUARANTINE',
  /** На проверке */
  Check = 'CHECK',
  /** В путь по радуге (умер) */
  RainbowRoad = 'RAINBOW_ROAD',
  /** Удален из системы */
  Deleted = 'DELETED',
}

export enum CategoryCode {
  /** Новая кошка (НК) */
  NewCat = 'NEW_CAT',
  /** Новая собака (НС) */
  NewDog = 'NEW_DOG',
}
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}
