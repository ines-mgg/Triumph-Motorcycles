import { FetchOptions } from '../model/index';

export function useFetch({ url, ...options }: FetchOptions): Promise<Response> {
  return fetch(url, options);
}
