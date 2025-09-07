export enum PostgresErrorCode {
  ForeignKeyViolation = '23503',
  UniqueViolation = '23505',
  NotNullViolation = '23502',
  CheckViolation = '23514',
  ExclusionViolation = '23P01',
}
