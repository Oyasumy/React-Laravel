import { MAIN_URL, REQUEST } from '@constants';

// Get list user
export const listUsers = ({ keyword, sort, type, page }: { keyword: string; sort: string; type: string; page: string }) => {
  const url = new URL(`${MAIN_URL}/users/list?size=2`);
  // const params = new URLSearchParams(url.search);

  if (keyword) url.searchParams.append('keyword', keyword);
  if (sort) url.searchParams.append('sort', sort);
  if (type) url.searchParams.append('sort_type', type);
  if (page) url.searchParams.append('page', page);

  return { url: url.href, method: REQUEST.GET };
};

export const detailUser = (id: string) => {
  const url = new URL(`${MAIN_URL}/users/${id}`);
  return { url: url.href, method: REQUEST.GET };
};

export const createUser = (data: any) => {
  const url = new URL(`${MAIN_URL}/users/create`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

export const updateUser = (id: string, data: any) => {
  const url = new URL(`${MAIN_URL}/users/${id}/update`);
  return { url: url.href, method: REQUEST.POST, body: data };
};

export const deleteUser = (data: any) => {
  const url = new URL(`${MAIN_URL}/users/delete`);
  return { url: url.href, method: REQUEST.POST, body: data };
};
