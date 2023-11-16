import React from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { useModalConfirm, useNavigation } from '@hooks';
import { MESSAGE, PAGE_URL, SORT_TYPE } from '@constants';

import { useManagerStore, useStores } from './hook';
import { Data } from './type';

// Type Component
export type TComponentWrap = {
  handle: { deleteStores: (value: string) => void };
  baseProps: any;
  state: { stores: Data | undefined; columns: any[] };
};

const { Text } = Typography;

// Divide the type with each props
type State = TComponentWrap['state'];
type Handle = TComponentWrap['handle'];
type BaseProps = TComponentWrap['baseProps'];

// The wallpaper component will return state, handle action and get data api
const ComponentWrap = (OriginComponent: (props: TComponentWrap) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    // Hook
    const { gotoPage, searchParams, setSearchParams } = useNavigation();

    // State
    const sortKey = searchParams.get('sort');
    const typeKey = searchParams.get('type');

    // Get list Store
    const { stores, refetch } = useStores();

    // Mutate Store
    const { deleteStoreMutate } = useManagerStore();

    // use modal
    const { confirm } = useModalConfirm();

    // Values

    console.log({ stores });

    // When click to title table will search DESC or ASC base on sort Item
    const getTitleColumn = (text: string, sortItem: string) => {
      return (
        <Text
          onClick={() =>
            setSearchParams(
              (prev) => {
                const checkType = typeKey === SORT_TYPE.DESC ? SORT_TYPE.ASC : SORT_TYPE.DESC;

                prev.set('sort', sortItem);

                prev.set('type', checkType);
                return prev;
              },
              { replace: true },
            )
          }
        >
          {text} {sortItem === sortKey && (typeKey === SORT_TYPE.ASC ? <CaretDownOutlined /> : <CaretUpOutlined />)}
        </Text>
      );
    };

    // Columns Title
    const columns = [
      {
        id: 'name',
        title: getTitleColumn('ユーザー名', 'name'),
        dataIndex: 'name',
        sort: 'name',
        show: true,
        width: 200,
      },
      {
        id: 'address',
        title: getTitleColumn('Address', 'address'),
        dataIndex: 'address',
        sort: 'address',
        show: true,
        width: 200,
      },
      {
        id: 'phone',
        // title: getTitleColumn('Role', 'phone'),
        title: 'Phone',
        dataIndex: 'phone',
        sort: 'phone',
        show: true,
        width: 130,
      },
      {
        id: 'image',
        // title: getTitleColumn('Role', 'image'),
        title: 'Image',
        dataIndex: 'image',
        sort: 'image',
        show: true,
        width: 110,
        render: (_: any, record: any) => {
          return <Image preview={false} width={80} style={{ maxHeight: 100 }} src={record?.image} />;
        },
      },
      {
        id: 'cate',
        // title: getTitleColumn('Role', 'cate'),
        title: 'Category',
        dataIndex: 'cate',
        sort: 'cate',
        show: true,
        width: 100,
      },
      {
        id: 'postCode',
        // title: getTitleColumn('Role', 'postCode'),
        title: 'Post Code',
        dataIndex: 'postCode',
        sort: 'postCode',
        show: true,
        width: 100,
      },

      {
        title: '',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any, index: any) => {
          return (
            <Flex>
              <Button className='btnPrimary' style={{ padding: '5px 20px' }} onClick={() => gotoPage(PAGE_URL.AUTH.STORE_EDIT(record?.id))}>
                更新
              </Button>
            </Flex>
          );
        },
      },
    ];

    const deleteStores: Handle['deleteStores'] = (value) => {
      confirm({
        title: MESSAGE.MI005,
        content: MESSAGE.MI006,
        onCancel: () => {
          console.log('cancel');
        },
        onOK: () => {
          console.log('ok', value);

          const parseValues = JSON.stringify(value || null);
          // Delete List Store
          deleteStoreMutate(parseValues, (value: any) => {
            console.log('delete success', value);

            // Refetch Stores
            refetch();
          });
        },
      });
    };

    const handle = { deleteStores };
    const state = { stores: stores, columns: columns };

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ComponentWrap;
