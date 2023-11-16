export const PRE_FIX = 'api/v1';
export const MAIN_URL = `https://annicam-web.sonix.dev/${PRE_FIX}`;

export const URL_TYPE = {
  READ: 'read',
  EDIT: 'edit',
  ADD: 'add',
  DETAIL: 'detail',
  NONE: 'none',
} as const;
export type UrlType = (typeof URL_TYPE)[keyof typeof URL_TYPE];

export const TOAST_TYPE = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
} as const;

export const SORT_TYPE = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const FILE_TYPE = ['image/png', 'image/jpeg', 'image/peg', 'image/webp'];
// Image must smaller than 2MB!
export const MAX_SIZE_FILE = 2;
