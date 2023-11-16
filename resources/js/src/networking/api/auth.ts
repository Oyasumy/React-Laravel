import { MAIN_URL, REQUEST } from '@constants';

// Sign in.
export const loginApi = (data: any) => {
  const url = new URL(`${MAIN_URL}/auth/signin`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

// Change password
export const changePasswordApi = (data: any) => {
  const url = new URL(`${MAIN_URL}/auth/password/change`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

// Forget password
export const forgetPasswordApi = (data: any) => {
  const url = new URL(`${MAIN_URL}/auth/password/forget`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

// Reset password
export const resetPasswordApi = (data: any) => {
  const url = new URL(`${MAIN_URL}/auth/password/reset`);
  return { url: url.href, method: REQUEST.POST, body: data };
};
