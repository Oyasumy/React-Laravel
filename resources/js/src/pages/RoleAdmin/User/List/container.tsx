import React from 'react';
import { useManagerUser, useUsers } from './hook';
import { Button, Flex, Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { Data } from './type';
import { useModalConfirm, useNavigation } from '@hooks';
import { MESSAGE, PAGE_URL, SORT_TYPE } from '@constants';

// Type Component
export type TComponentWrap = {
  handle: { deleteUsers: (value: string) => void };
  baseProps: any;
  state: { users: Data | undefined; columns: any[] };
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

    // Get list User
    const { users, refetch } = useUsers();

    // Mutate User
    const { deleteUserMutate } = useManagerUser();

    // use modal
    const { confirm } = useModalConfirm();

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
        width: 250,
      },
      {
        id: 'email',
        title: getTitleColumn('Email', 'email'),
        dataIndex: 'email',
        sort: 'email',
        show: true,
        width: 180,
      },
      {
        id: 'role_name',
        // title: getTitleColumn('Role', 'role_name'),
        title: 'Role',
        dataIndex: 'role_name',
        sort: 'role_name',
        show: true,
        width: 80,
      },
      {
        id: 'is_validity',
        title: getTitleColumn('Validity', 'is_validity'),
        dataIndex: 'is_validity',
        sort: 'is_validity',
        show: true,
        width: 80,
      },

      {
        title: '',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any, index: any) => {
          return (
            <Flex>
              <Button className='btnPrimary' style={{ padding: '5px 20px' }} onClick={() => gotoPage(PAGE_URL.AUTH.USER_EDIT(record?.id))}>
                更新
              </Button>
            </Flex>
          );
        },
      },
    ];

    const deleteUsers: Handle['deleteUsers'] = (value) => {
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
          deleteUserMutate(parseValues, (value: any) => {
            console.log('delete success', value);

            // Refetch Users
            refetch();
          });
        },
      });
    };

    const handle = { deleteUsers };
    const state = { users: users, columns: columns };

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ComponentWrap;
