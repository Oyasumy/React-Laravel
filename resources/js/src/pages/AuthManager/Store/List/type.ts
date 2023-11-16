export interface Store {
  error: boolean;
  data: Data;
  message: null;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  name: string;
  address: string;
  phone: string;
  url: string;
  comment: string;
  category_id: number;
  postal_code_id: number;
  is_public: number;
  images: Image[];
  category: Category;
  postalcode: Postalcode;
}

export interface Category {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  file_name: string;
  is_main: number;
  store_id: number;
  url_image: string;
}

export interface Postalcode {
  id: number;
  postal_code: string;
  prefecture_kanji: string;
  city_kanji: string;
  town_kanji: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
