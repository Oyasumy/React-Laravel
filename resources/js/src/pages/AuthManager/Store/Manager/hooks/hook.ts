import { QUERY_KEY } from '@constants/queryKey';
import { useNavigation, useQuery } from '@hooks';
import { detailStore, infoStore, listCitiesStore, listTownsStore } from '@networking/api';

import { isNil } from '@util';
import ApiClient from '@networking/index';

import { Cities, City, InfoStore, Store, Town, Towns } from '../type';


export const useStore = () => {
  const { request } = ApiClient();

  const { params } = useNavigation();

  // Params
  const idStore: any = params?.id;

  if (isNil(idStore)) return { store: undefined, refetch: undefined };

  // Get url
  const fetchData = detailStore(idStore);

  // Fetch data
  const { data, refetch } = useQuery<Store>({
    queryKey: [QUERY_KEY.STORE, idStore],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    onError: (err: any) => {
      console.log({ err });
    },
    enabled: !isNil(idStore),
  });

  return { store: data?.data, refetch };
};

export const useInfoStore = () => {
  const { request } = ApiClient();

  // Get url
  const fetchData = infoStore();

  // Fetch data
  const { data, refetch } = useQuery<InfoStore>({
    queryKey: [QUERY_KEY.INFO_STORE],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    select(data) {
      data.data.categories = data.data.categories?.map((m) => {
        m.value = m.id;
        m.label = m.name;
        return m;
      });

      data.data.prefectures = data.data.prefectures?.map((m) => {
        m.value = m.prefecture_kanji;
        m.label = m.prefecture_kanji;
        return m;
      });

      return data;
    },
  });

  return { infoStore: data?.data };
};

export const usePostCode = () => {
  const { request } = ApiClient();

  // Search Params
  const { searchParams } = useNavigation();

  // Search Values
  const city = searchParams.get('city') ?? '';
  const town = searchParams.get('town') ?? '';

  // Get url
  const fetchDataCities = listCitiesStore(city);

  // Fetch data
  const { data: resultCities } = useQuery<Cities>({
    queryKey: [QUERY_KEY.CITIES_STORE, city],

    queryFn: () => request(fetchDataCities).then((res: any) => res?.data),
    hasLoading: false,

    select(data) {
      data.data = data.data?.map((m) => {
        m.value = m.city_kanji;
        m.label = m.city_kanji;
        return m;
      });

      return data;
    },
    staleTime: Infinity,
    enabled: !isNil(city),
  });

  // Get url
  const fetchDataTown = listTownsStore(town);

  // Fetch data
  const { data: resultTowns } = useQuery<Towns>({
    queryKey: [QUERY_KEY.TOWNS_STORE, town],

    queryFn: () => request(fetchDataTown).then((res: any) => res?.data),
    hasLoading: false,
    select(data) {
      data.data = data.data?.map((m) => {
        m.value = m.id;
        m.label = m.town_kanji;
        return m;
      });

      return data;
    },
    staleTime: Infinity,
  });

  return { cities: resultCities?.data, towns: resultTowns?.data };
};
