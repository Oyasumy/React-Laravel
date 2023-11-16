import { MAIN_URL, REQUEST } from '@constants';

// Get list user
export const listStores = ({ keyword, sort, type, page }: { keyword: string; sort: string; type: string; page: string }) => {
  const url = new URL(`${MAIN_URL}/stores/list?size=2`);

  if (keyword) url.searchParams.append('keyword', keyword);
  if (sort) url.searchParams.append('sort', sort);
  if (type) url.searchParams.append('sort_type', type);
  if (page) url.searchParams.append('page', page);

  return { url: url.href, method: REQUEST.GET };
};

export const detailStore = (id: string) => {
  const url = new URL(`${MAIN_URL}/stores/${id}`);
  return { url: url.href, method: REQUEST.GET };
};

export const createStore = (data: any) => {
  const url = new URL(`${MAIN_URL}/stores/create`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

export const updateStore = (id: string, data: any) => {
  const url = new URL(`${MAIN_URL}/stores/${id}/update`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

export const deleteStore = (data: any) => {
  const url = new URL(`${MAIN_URL}/stores/delete`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

export const approveStore = (id: string) => {
  const url = new URL(`${MAIN_URL}/stores/${id}/approve`);
  return { url: url.href, method: REQUEST.POST };
};

export const infoStore = () => {
  const url = new URL(`${MAIN_URL}/stores/get-data-create`);
  return { url: url.href, method: REQUEST.GET };
};

export const listCitiesStore = (city: string) => {
  const url = new URL(`${MAIN_URL}/stores/get-postal-code?type=city`);

  if (city) url.searchParams.append('value', city);
  return { url: url.href, method: REQUEST.GET };
};

export const listTownsStore = (town: string) => {
  const url = new URL(`${MAIN_URL}/stores/get-postal-code?type=town`);
  if (town) url.searchParams.append('value', town);

  return { url: url.href, method: REQUEST.GET };
};

export const blobFormUrl = (imgUrl: string) => {
  const url = new URL(imgUrl);

  return { url: url.href, method: REQUEST.GET };
};
