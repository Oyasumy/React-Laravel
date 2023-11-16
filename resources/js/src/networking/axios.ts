import axios from 'axios';
import { MAIN_URL } from '@constants';

export default axios.create({
  baseURL: MAIN_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
