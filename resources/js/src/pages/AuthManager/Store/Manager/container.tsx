import React, { Ref, useCallback, useEffect, useState } from 'react';
import { Form, FormInstance, UploadFile } from 'antd';

import { useInfoStore, usePostCode, useStore } from './hooks/hook';
import { Cities, City, Data, DataInfo, Town, Towns } from './type';
import { useNavigation, useRedux } from '@hooks';
import { useManagerStore } from '../List/hook';
import { selectUser } from '@reducer/reducer/user';
import { ROLE_ACCESS, URL_TYPE } from '@constants';
import { UploadRef } from 'antd/es/upload/Upload';
import { UploadProvider, useUploadContext } from './hooks/context';

// Type Component
export type TComponentWrap = {
  handle: {
    createStore: (value: any) => void;
    updateStore: (value: any) => void;
    approveStore: () => void;
    searchPostCode: (place: 'city' | 'town' | 'code' | 'cate', value: any) => void;
  };
  baseProps: any;
  state: {
    store: Data | undefined;
    infoStore: DataInfo | undefined;
    cities: City[] | undefined;
    towns: Town[] | undefined;
    showBtnApprove: boolean;
    formInstance: {
      form: FormInstance<any>;
      formRef: React.Ref<FormInstance<any>> | undefined;
      uploadRef: React.Ref<UploadRef<any>> | undefined;
    };
  };
};

// Divide the type with each props
type State = TComponentWrap['state'];
type Handle = TComponentWrap['handle'];
type BaseProps = TComponentWrap['baseProps'];

// The wallpaper component will return state, handle action and get data api
const ComponentWrap = (OriginComponent: (props: TComponentWrap) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    /**
     * Hooks
     */
    const { searchParams, setSearchParams, typeUrl } = useNavigation();
    const { createStoreMutate, updateStoreMutate, approveStoreMutate } = useManagerStore();
    const { select } = useRedux();
    const [form] = Form.useForm();
    const { fileList, setFileList } = useUploadContext();

    // Get Detail Store
    const { store, refetch } = useStore();
    // Get info store
    const { infoStore } = useInfoStore();
    // Get list city and town
    const { cities, towns } = usePostCode();

    // Refs
    const formRef = React.useRef<FormInstance<any> | undefined>(undefined);
    const uploadRef = React.useRef<UploadRef<any> | undefined>(undefined);
    // Values
    const showBtnApprove = (select(selectUser)?.role === ROLE_ACCESS.ADMIN && typeUrl === URL_TYPE.EDIT) ?? false;
    const idStore = store?.id;

    /**
     * Effect Hooks
     */

    useEffect(() => {
      const initValue = async () => {
        if (idStore) {
          const postCode = store.postalcode;
          const prefectureKanji = postCode.prefecture_kanji;
          const cityKanji = postCode.city_kanji;

          if (prefectureKanji) {
            searchPostCode('city', prefectureKanji);
          }
          if (cityKanji) {
            searchPostCode('town', cityKanji);
          }

          const fileList: any[] = [];
          for (let index = 0; index < store?.images.length; index++) {
            const image = store?.images[index];

            const item = {
              uid: image?.id?.toString(),
              name: image?.file_name,
              status: 'done',
              url: image?.url_image,
            };

            fileList.push(item);
          }

          if (fileList?.length > 0) {
            setFileList(fileList);
          }

          formRef.current?.setFieldsValue({
            address: store?.address,
            category_id: store?.category_id,
            comment: store.comment,
            main_image: store.comment,
            name: store.name,
            phone: +store.phone,
            'sub_images[0]': '',
            'sub_images[1]': '',
            'sub_images[2]': '',
            url: store.url,
            prefectures: prefectureKanji,
            cities: cityKanji,
            postal_code_id: store.postal_code_id,
          });
        }
      };

      initValue();
    }, [store]);

    // Init value Select form
    useEffect(() => {
      if (!idStore) {
        const city = searchParams.get('city');
        const town = searchParams.get('town');
        const code = searchParams.get('code');
        const cate = searchParams.get('cate');

        const fistCategory = infoStore?.categories?.[0].value;
        const fistPrefecture = infoStore?.prefectures?.[0].value;
        const fistPostCode = towns?.[0]?.value;

        formRef.current?.setFieldsValue({
          category_id: +(cate ?? fistCategory ?? ''),
          prefectures: city ?? null,
          cities: town,
          postal_code_id: +(code ?? fistPostCode ?? ''),
          url: 'https://gog.vv',
        });
      }
    }, [store, towns, infoStore]);

    /**
     * Functions
     */
    const createStore: Handle['createStore'] = (value) => {
      const imageList = fileList?.map((img, index) => {
        return {
          id: null,
          file: img.originFileObj,
          priority: index + 1,
        };
      });
      value.images = imageList;

      console.log({ value });

      createStoreMutate(value);
    };

    const updateStore: Handle['updateStore'] = (value) => {
  
      if (!store) return;

      // Create temp image with url_image = null -> will remove all items if it not includes in new image List
      let imagesDelete = [...store.images]?.map((img) => ({ ...img, url_image: null }));
      const imageList = fileList?.map((img, index) => {
        if (imagesDelete) imagesDelete = imagesDelete?.filter((m: any) => m?.id != +img.uid);

        return {
          id: img?.originFileObj ? null : +img?.uid,
          file: img?.originFileObj,
          url_image: img?.url ?? img.name,
          priority: index + 1,
        };
      });

      // Create new images key = value
      value.images = [...imageList, ...imagesDelete];

      console.log({ value, fileList, imagesDelete });

      updateStoreMutate({ id: store?.id, data: value });
    };

    const approveStore: Handle['approveStore'] = () => {
      approveStoreMutate(store?.id);
    };

    const searchPostCode: Handle['searchPostCode'] = useCallback((place, value) => {
      if (place === 'city') {
        setSearchParams(
          (prev) => {
            prev.set('city', value);
            prev.delete('town');
            prev.delete('code');
            return prev;
          },
          { replace: true },
        );
      } else {
        setSearchParams(
          (prev) => {
            prev.set(place, value);
            return prev;
          },
          { replace: true },
        );
      }
    }, []);

    /**
     * Sent Props to Main component
     */
    const handle = { createStore, updateStore, searchPostCode, approveStore };
    const state = {
      store: store,
      infoStore,
      cities,
      towns,
      showBtnApprove,
      formInstance: { form, formRef: formRef as State['formInstance']['formRef'], uploadRef: uploadRef as State['formInstance']['uploadRef'] },
    };

    return (
      <>
        <OriginComponent baseProps={props} state={state} handle={handle} />
      </>
    );
  };

  return NewComponent;
};

export default ComponentWrap;
