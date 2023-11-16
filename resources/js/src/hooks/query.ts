import { useQuery as useQueryReact, useMutation as useMutationReact, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { NavigateOptions, To } from 'react-router-dom';

import { clearSession, setLoading } from '@reducer/reducer/app';
import { MESSAGE, PAGE_URL } from '@constants';
import { AppDispatch } from '@reducer/configStore';

import { TToast, useToast } from './toast';
import { useNavigation } from './navigation';
import { useRedux } from './redux';

type ReturnQuery<T> = { error: boolean; data: T; message: string };

type TQuery<T> = {
  queryFn: () => Promise<any>;
  onSuccess?: (data: ReturnQuery<T>) => void;
  onError?: (data: any) => void;
  hasLoading?: boolean;
} & Omit<UseQueryOptions<T, any, T, any>, 'onSuccess' | 'onError'>;

export const useQuery = <T>({ queryFn, onSuccess, onError, hasLoading = true, ...rest }: TQuery<T>) => {
  // Hook
  const { toast, toastSuccess, toastError } = useToast();
  const { gotoPage } = useNavigation();
  const { dispatch } = useRedux();

  // Use Query
  return useQueryReact<T, any, T, any>({
    ...rest,
    queryFn: () => {
      // Show Loading
      hasLoading && dispatch(setLoading(true));
      return queryFn();
    },
    onSuccess: (data: ReturnQuery<T>) => {
      //   check if data has error
      if (data?.error) {
        console.log('error api');
        // Show toast error
        toastError(data?.message || '');
      }
      return onSuccess && onSuccess(data);
    },
    onError: (error: any) => {
      console.log({ error });

      const statusCode = error?.response?.status;
      const data = error?.response?.data;

      // Check  status Code
      checkStatusCode(statusCode, gotoPage, toastError, dispatch, data);

      return onError && onError(error);
    },

    onSettled: () => {
      // TODO

      // Hide Loading
      hasLoading && dispatch(setLoading(false));
    },
  });
};

type TMutation<M> = {
  mutationFn: (data: unknown) => Promise<any>;
  onSuccess?: (data: ReturnQuery<M>) => void;
  onError?: (data: any) => void;
  hasLoading?: boolean;
} & UseMutationOptions;
export const useMutation = <M>({ mutationFn, onSuccess, onError, hasLoading = true, ...rest }: TMutation<M>) => {
  const { toast, toastError, toastSuccess } = useToast();
  const { gotoPage } = useNavigation();
  const { dispatch, select } = useRedux();

  return useMutationReact({
    ...rest,
    mutationFn: (data: unknown) => {
      // Show Loading
      hasLoading && dispatch(setLoading(true));

      return mutationFn(data);
    },
    onSuccess: async (data: ReturnQuery<M>) => {
      //   check if data has error
      if (data?.error) {
        console.log('error api');
        // Show toast error
        toastSuccess(data?.message || '');
      }
      return onSuccess && onSuccess(data);
    },
    onError: (error: any) => {
      console.log({ error });
      // Check  status Code
      const statusCode = error?.response?.status;
      const data = error?.response?.data;

      checkStatusCode(statusCode, gotoPage, toastError, dispatch, data);

      return onError && onError(error);
    },
    onSettled: () => {
      // Hide Loading
      hasLoading && dispatch(setLoading(false));
    },
  });
};

const checkStatusCode = (statusCode: number, gotoPage: (to: To, options?: NavigateOptions | undefined) => void, toastError: TToast, dispatch: AppDispatch, data: any) => {
  switch (statusCode) {
    case 401:
      // Dispatches a clear session.
      dispatch(clearSession());
      // Goto Login
      gotoPage(PAGE_URL.AUTH.LOGIN, { replace: true });
      // Show message failed
      toastError(MESSAGE.ME002);
      break;
    case 403:
      // Dispatches a clear session.
      dispatch(clearSession());
      // Goto Login
      gotoPage(PAGE_URL.AUTH.LOGIN, { replace: true });
      //validation server return message
      toastError(data.message);
      break;
    case 422:
      //validation server return message
      toastError(data.message);
      break;

    default:
      // Show toastError Failed
      toastError(MESSAGE.M9999);
      break;
  }
};
