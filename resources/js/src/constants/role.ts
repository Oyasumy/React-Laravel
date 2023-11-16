export const ROLE_ACCESS = {
  ADMIN: 'admin',
  LC: 'lc',
  USER: 'user',
  NONE: 'none',
} as const;

export type RoleAccess = (typeof ROLE_ACCESS)[keyof typeof ROLE_ACCESS];
