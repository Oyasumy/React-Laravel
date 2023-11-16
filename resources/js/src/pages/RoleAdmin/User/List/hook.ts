import ApiClient from '@networking/index';
import { User } from './type';
import { useMutation, useNavigation, useQuery, useToast } from '@hooks';
import { createUser, deleteUser, listUsers, updateUser } from '@networking/api';
import { MESSAGE, PAGE_URL, QUERY_KEY } from '@constants';

type TData = User;

export const useUsers = () => {
  const { request } = ApiClient();

  const { searchParams } = useNavigation();

  // params
  const sortKey = searchParams.get('sort') || '';
  const typeKey = searchParams.get('type') || '';
  const keywordKey = searchParams.get('keyword') || '';
  const pageKey = searchParams.get('page') || '';

  // Get url
  const fetchData = listUsers({ keyword: keywordKey, sort: sortKey, type: typeKey, page: pageKey });

  // Fetch data
  const { data, refetch } = useQuery<TData>({
    queryKey: [QUERY_KEY.USERS, fetchData.url],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    onError: (err: any) => {
      console.log({ err });
    },
    select: (oldData) => {
      oldData.data.data = oldData.data.data?.map((item: any) => ({
        ...item,
        key: item?.id,
      }));

      return oldData;
    },
  });

  return { users: data?.data, refetch };
};

export const useManagerUser = () => {
  const { request } = ApiClient();
  const { gotoPage } = useNavigation();
  const { toastSuccess } = useToast();

  // Delete User
  const mutationDeleteUser = useMutation({
    mutationFn: (user: any) => {
      return request(deleteUser(user));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI012);
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  // Update User
  const mutationUpdateUser = useMutation({
    mutationFn: (user: any) => {
      return request(updateUser(user?.id, user.data));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI013);

      // Goto List User
      gotoPage(PAGE_URL.AUTH.USER_LIST, { replace: true });
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  // Create User
  const mutationCreateUser = useMutation({
    mutationFn: (user: any) => {
      return request(createUser(user));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI014);

      // Goto List User
      gotoPage(PAGE_URL.AUTH.USER_LIST, { replace: true });
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  /**
   *
   * Mutation mutate
   */
  const deleteUserMutate = (user: any, callback: any) => {
    mutationDeleteUser.mutate(user, {
      onSuccess: (value) => {
        callback(value);
      },
    });
  };
  const updateUserMutate = (user: any) => {
    mutationUpdateUser.mutate(user);
  };
  const createUserMutate = (user: any) => {
    mutationCreateUser.mutate(user);
  };

  return { deleteUserMutate, updateUserMutate, createUserMutate };
};
