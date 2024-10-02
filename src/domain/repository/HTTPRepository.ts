import { FetchOptions } from '../model/index.js';

export function useFetch({ url, ...options }: FetchOptions): Promise<Response> {
  return fetch(url, options);
}
