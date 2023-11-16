import ApiClient from '@networking/index';
import { changePasswordApi, forgetPasswordApi, loginApi, resetPasswordApi } from '@networking/api';
import { clearSession, setACcessToken } from '@reducer/reducer/app';
import { setUser, setValidity } from '@reducer/reducer/user';
import { MESSAGE, PAGE_URL } from '@constants';

import { useRedux } from './redux';
import { useNavigation } from './navigation';
import { useToast } from './toast';
import { useMutation } from './query';

export const useAuthentication = () => {
  // Access the client
  const { request } = ApiClient();
  const { gotoPage } = useNavigation();
  const { dispatch } = useRedux();

  const { toastSuccess } = useToast();
  // SignIn
  const mutationSignIn = useMutation({
    mutationFn: (user: any) => {
      return request(loginApi(user));
    },
    onSuccess: async (value: any) => {
      // Invalidate and refetch
      console.log('user', value);

      const response = value?.data?.data;
      // Dispatch a select access token.
      const accessToken = response?.access_token;
      const role = response?.role || '';
      const name = response?.role || '';
      const isValidity = !!response?.is_validity;

      dispatch(setACcessToken(accessToken));
      dispatch(setUser({ name, role, isValidity }));

      if (!isValidity) {
        gotoPage(PAGE_URL.AUTH.CHANGE_PASSWORD);
      } else {
        // Redirect to Home Page
        gotoPage(PAGE_URL.AUTH.HOME, { replace: true });
      }
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  // Change password
  const mutationChangePassword = useMutation({
    mutationFn: (user: any) => {
      return request(changePasswordApi(user));
    },
    onSuccess: async (value: any) => {
      // Invalidate and refetch
      console.log('change password', value);

      dispatch(setValidity(true));

      // Redirect to Home Page
      gotoPage(PAGE_URL.AUTH.HOME, { replace: true });
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  // Forgot Password
  const mutationForgotPassword = useMutation({
    mutationFn: (user: any) => {
      return request(forgetPasswordApi(user));
    },
    onSuccess: async (value: any) => {
      // Invalidate and refetch
      console.log('forgot password', value);

      // Show Toast
      toastSuccess(MESSAGE.MI010);
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  const mutationResetPassword = useMutation({
    mutationFn: (user: any) => {
      return request(resetPasswordApi(user));
    },
    onSuccess: async (value: any) => {
      // Invalidate and refetch
      console.log('reset password', value);

      // Show Toast
      toastSuccess(MESSAGE.MI011);

      // Goto Login Page
      gotoPage(PAGE_URL.AUTH.LOGIN, { replace: true });
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  /**
   *
   * Mutation mutate
   */
  const signIn = (user: any) => {
    mutationSignIn.mutate(user);
  };

  const changePassword = (user: any) => {
    mutationChangePassword.mutate(user);
  };

  const forgotPassword = (user: any) => {
    mutationForgotPassword.mutate(user);
  };

  const resetPassword = (user: any) => {
    mutationResetPassword.mutate(user);
  };

  // Dispatches a clear session to the user.
  const signOut = () => {
    // Dispatches a clear session.
    dispatch(clearSession());
    // Navigate to the login page.
    gotoPage(PAGE_URL.AUTH.LOGIN, { replace: true });
  };

  return { signIn, changePassword, forgotPassword, resetPassword, signOut };
};
