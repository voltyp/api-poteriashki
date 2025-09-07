import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';
import { PostgresError } from '@/common/types';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const error = exception.driverError as unknown as PostgresError;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Внутренняя ошибка сервера';

    // Обработка PostgreSQL ошибок
    if (error?.code) {
      switch (error.code) {
        case PostgresErrorCode.UniqueViolation:
          status = HttpStatus.CONFLICT;
          message =
            'Нарушение уникальности: запись с такими данными уже существует';
          break;

        case PostgresErrorCode.ForeignKeyViolation:
          status = HttpStatus.BAD_REQUEST;
          message = 'Нарушение внешнего ключа: связанная запись не найдена';
          break;

        case PostgresErrorCode.NotNullViolation:
          status = HttpStatus.BAD_REQUEST;
          message =
            'Нарушение ограничения NOT NULL: обязательное поле не заполнено';
          break;

        case PostgresErrorCode.CheckViolation:
          status = HttpStatus.BAD_REQUEST;
          message = 'Нарушение проверочного ограничения';
          break;

        case PostgresErrorCode.ExclusionViolation:
          status = HttpStatus.CONFLICT;
          message = 'Нарушение ограничения исключения';
          break;

        default:
          this.logger.error(
            `Неизвестная ошибка БД: ${error.code} - ${error.message}`,
            exception.stack,
          );
          message = 'Ошибка базы данных';
      }
    }

    // Логирование ошибки
    this.logger.error(
      `Database error: ${error?.code || 'UNKNOWN'} - ${
        error?.message || exception.message
      }`,
      {
        url: request.url,
        method: request.method,
        body: request.body,
        stack: exception.stack,
      },
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error: error?.code || 'DATABASE_ERROR',
    });
  }
}
