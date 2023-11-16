export interface User {
  error: boolean;
  data: Data;
  message: null;
}

export interface Data {
  currentPage: number;
  data: Datum[];
  firstPageURL: string;
  from: number;
  lastPage: number;
  lastPageURL: string;
  links: Link[];
  nextPageURL: null;
  path: string;
  perPage: number;
  prevPageURL: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  name: string;
  email: string;
  roleID: number;
  isValidity: number;
  roleName: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
