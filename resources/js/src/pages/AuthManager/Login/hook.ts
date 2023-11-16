import { REQUEST } from '@constants';
import { useNavigation, useQuery } from '@hooks';
import ApiClient from '@networking/index';

export const usePokemon = () => {
  const { request } = ApiClient();

  // Get url
  const fetchData = { url: 'https://pokeapi.co/api/v2/pokemon/ditto', method: REQUEST.GET, body: null };

  // Fetch data
  const { data, refetch } = useQuery({
    queryKey: ['pokemon'],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    onError: (err: any) => {
      console.log({ err });
    },
  });

  return { poke: data, refetch };
};
