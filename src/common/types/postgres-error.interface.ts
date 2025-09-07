export interface PostgresError {
  code: string;
  message: string;
  detail?: string;
  hint?: string;
  table?: string;
  column?: string;
  constraint?: string;
  schema?: string;
  severity?: string;
}
