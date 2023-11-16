const ROLE_ROUTE = {
  AUTH: '/auth',
  ADMIN: '/admin',
  LC: '/lc',
  USER: '',
} as const;

export const PAGE_URL_TYPE = {
  LIST: 'list',
  LIST_SEARCH: 'list/:keyword/:page/:sort/:type',
  ADD: 'add',
  DETAIL: 'detail',
  EDIT: 'edit/:id',
} as const;

// AUTH Page
const PAGE_AUTH = {
  LOGIN: `${ROLE_ROUTE.AUTH}/login`,
  CHANGE_PASSWORD: `${ROLE_ROUTE.AUTH}/change-password`,
  RESET_PASSWORD: `${ROLE_ROUTE.AUTH}/reset-password/:token/:email`,
  FORGET_PASSWORD: `${ROLE_ROUTE.AUTH}/forget-password`,

  HOME: `${ROLE_ROUTE.AUTH}/home`,

  // USER
  USER: `${ROLE_ROUTE.AUTH}/user`,
  USER_LIST: `${ROLE_ROUTE.AUTH}/user/${PAGE_URL_TYPE.LIST}`,
  USER_ADD: `${ROLE_ROUTE.AUTH}/user/${PAGE_URL_TYPE.ADD}`,
  USER_EDIT: (id: string) => `${ROLE_ROUTE.AUTH}/user/edit/${id}`,

  // STORE
  STORE: `${ROLE_ROUTE.AUTH}/store`,
  STORE_LIST: `${ROLE_ROUTE.AUTH}/store/${PAGE_URL_TYPE.LIST}`,
  STORE_ADD: `${ROLE_ROUTE.AUTH}/store/${PAGE_URL_TYPE.ADD}`,
  STORE_EDIT: (id: string) => `${ROLE_ROUTE.AUTH}/store/edit/${id}`,
} as const;

// User Page
const PAGE_USER = {
  HOME: `${ROLE_ROUTE.USER}/home`,
  POST: `${ROLE_ROUTE.USER}/post`,
};

//
export const PAGE_URL = {
  AUTH: PAGE_AUTH,

  USER: PAGE_USER,

  NOT_FOUND: '/not-found',
} as const;

export type PageUrl = (typeof PAGE_URL)[keyof typeof PAGE_URL];
