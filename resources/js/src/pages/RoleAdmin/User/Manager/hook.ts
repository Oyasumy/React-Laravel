import ApiClient from '@networking/index';
import { User } from './type';
import { useNavigation, useQuery } from '@hooks';
import { isNil } from '@util';
import { detailUser } from '@networking/api';
import { QUERY_KEY } from '@constants';

type TData = User;

export const useUser = () => {
  const { request } = ApiClient();

  const { params } = useNavigation();

  // Params
  const idUser: any = params?.id;

  if (isNil(idUser)) return { user: undefined, refetch: undefined };

  // Get url
  const fetchData = detailUser(idUser);

  // Fetch data
  const { data, refetch } = useQuery<TData>({
    queryKey: [QUERY_KEY.USER, idUser],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    onError: (err: any) => {
      console.log({ err });
    },
    enabled: !isNil(idUser),
  });

  return { user: data?.data, refetch };
};
