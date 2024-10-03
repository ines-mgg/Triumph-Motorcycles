type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Headers = Record<string, string>;

export interface FetchOptions {
  url: string;
  method: Method;
  headers: Headers;
  signal: AbortSignal;
  body?: string;
}
