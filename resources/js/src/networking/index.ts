import { REQUEST, REQUEST_TYPE } from '@constants';
import { useRedux } from '@hooks/redux';
import { selectAccessToken } from '@reducer/reducer/app';
import { isFile } from '@util';

import axios from './axios';

export type TRequest = { url: string; method: REQUEST_TYPE; body?: any };

const ApiClient = () => {
  const { dispatch, select } = useRedux();
  const accessToken = select(selectAccessToken);

  const defaultHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };
  };

  const request = async ({ url, method, body }: TRequest) => {
    const files: any[] = body?.files;
    delete body?.files;

    const headers = defaultHeaders();

    const formData = new FormData();

    for (const key in body) {
      const value = body[key];

      // Check if value has type File will add header to Request
      checkIsFile(value, headers);

      formData.append(key, value);
    }

    try {
      // Generates a JSON representation of the form.
      const data = files ? formData : body;

      console.log('URL---', { url, method, data });

      let response;

      switch (method) {
        case REQUEST.GET:
          response = axios.get(url, { headers: headers });
          break;
        case REQUEST.POST:
          response = axios.post(url, data, {
            headers: headers,
          });
          break;
        case REQUEST.PUT:
          response = axios.put(url, data, {
            headers: headers,
          });
          break;
        case REQUEST.PATCH:
          response = axios.patch(url, data, {
            headers: headers,
          });
          break;
        case REQUEST.DELETE:
          response = axios.delete(url, {
            headers: headers,
          });
          break;

        default:
          response = axios.get(url);
          break;
      }

      // console.log({ response });

      return response;
    } catch (error) {
      console.log({ error });
    }
  };

  return { request };
};

const checkIsFile = (value: any, headers: any) => {
  if (isFile(value)) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      value.forEach((keyValue) => {
        Object.keys(keyValue).forEach((item) => {
          if (isFile(keyValue[item])) {
            headers['Content-Type'] = 'multipart/form-data';
          }
        });
      });
    } else {
      Object.keys(value).forEach((item) => {
        if (isFile(value[item])) {
          headers['Content-Type'] = 'multipart/form-data';
        }
      });
    }
  }
};

export default ApiClient;
