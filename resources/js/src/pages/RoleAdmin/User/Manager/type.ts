export interface User {
  error: boolean;
  data: Data;
  message: null;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  role_id: number;
  is_validity: number;
  role_name: string;
}
