import ApiClient from '@networking/index';
import { Store } from './type';
import { useMutation, useNavigation, useQuery, useToast } from '@hooks';
import { approveStore, createStore, deleteStore, listStores, updateStore } from '@networking/api';
import { MESSAGE, PAGE_URL, QUERY_KEY } from '@constants';

type TData = Store;

export const useStores = () => {
  const { request } = ApiClient();

  const { searchParams } = useNavigation();

  // params
  const sortKey = searchParams.get('sort') || '';
  const typeKey = searchParams.get('type') || '';
  const keywordKey = searchParams.get('keyword') || '';
  const pageKey = searchParams.get('page') || '';

  // Get url
  const fetchData = listStores({ keyword: keywordKey, sort: sortKey, type: typeKey, page: pageKey });

  // Fetch data
  const { data, refetch } = useQuery<TData>({
    queryKey: [QUERY_KEY.STORES, fetchData.url],

    queryFn: () => request(fetchData).then((res: any) => res?.data),

    select: (oldData) => {
      oldData.data.data = oldData.data.data?.map((item: any) => ({
        ...item,
        key: item?.id,
        image: item?.images?.[0]?.url_image,
        cate: item?.category?.name,
        postCode: item?.postalcode?.postal_code,
      }));

      return oldData;
    },
  });

  return { stores: data?.data, refetch };
};

export const useManagerStore = () => {
  const { request } = ApiClient();
  const { gotoPage } = useNavigation();
  const { toastSuccess } = useToast();

  // Delete Store
  const mutationDeleteStore = useMutation({
    mutationFn: (store: any) => {
      return request(deleteStore(store));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI012);
    },
  });

  // Update Store
  const mutationUpdateStore = useMutation({
    mutationFn: (store: any) => {
      return request(updateStore(store?.id, store.data));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI013);

      // Goto List Store
      gotoPage(PAGE_URL.AUTH.STORE_LIST, { replace: true });
    },
  });

  // Create Store
  const mutationCreateStore = useMutation({
    mutationFn: (store: any) => {
      return request(createStore(store));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI014);

      // Goto List Store
      gotoPage(PAGE_URL.AUTH.STORE_LIST, { replace: true });
    },
  });

  // Approve Store
  const mutationApproveStore = useMutation({
    mutationFn: (store: any) => {
      return request(approveStore(store));
    },
    onSuccess: async (value: any) => {
      // Show Toast
      toastSuccess(MESSAGE.MI015);

      // Goto List Store
      gotoPage(PAGE_URL.AUTH.STORE_LIST, { replace: true });
    },
  });

  /**
   *
   * Mutation mutate
   */
  const deleteStoreMutate = (store: any, callback: any) => {
    mutationDeleteStore.mutate(store, {
      onSuccess: (value) => {
        callback(value);
      },
    });
  };
  const updateStoreMutate = (store: any) => {
    mutationUpdateStore.mutate(store);
  };
  const createStoreMutate = (store: any) => {
    mutationCreateStore.mutate(store);
  };
  const approveStoreMutate = (store: any) => {
    mutationApproveStore.mutate(store);
  };

  return { deleteStoreMutate, updateStoreMutate, createStoreMutate, approveStoreMutate };
};
