export type REQUEST_TYPE = 'get' | 'post' | 'put' | 'patch' | 'delete';

// export const REQUEST: Record<string, REQUEST_TYPE> = {
export const REQUEST = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;
