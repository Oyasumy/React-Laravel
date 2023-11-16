/**
 * Store Type
 */
export interface Store {
  error: boolean;
  data: Data;
  message: null;
}

export interface Data {
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
  priority: number;
  store_id: number;
  url_image: string | null;
}

export interface Postalcode {
  id: number;
  postal_code: string;
  prefecture_kanji: string;
  city_kanji: string;
  town_kanji: string;
}

/**
 * Info Store Type
 */

export interface InfoStore {
  error: boolean;
  data: DataInfo;
  message: null;
}

export interface DataInfo {
  categories: Category[];
  prefectures: Prefecture[];
}

export interface Category {
  id: number;
  name: string;
  label: string;
  value: number;
}

export interface Prefecture {
  prefecture_kanji: string;
  label: string;
  value: string;
}

/**
 * Post Code Type
 */
export interface Cities {
  error: boolean;
  data: City[];
  message: null;
}

export interface City {
  city_kanji: string;
  label: string;
  value: string;
}

export interface Towns {
  error: boolean;
  data: Town[];
  message: null;
}

export interface Town {
  id: number;
  town_kanji: string;
  label: string;
  value: number | string | undefined;
}
