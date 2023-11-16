import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Form, Space, Typography } from 'antd';
import Search from 'antd/es/input/Search';

import ComponentWrap, { TComponentWrap } from './container';
import { useNavigation } from '@hooks';
import { COLOR, PAGE_URL } from '@constants';
import { BoxFlex } from '@components/Box';
import TableList from '@components/TableList';
import Pagination from '@components/Pagination';

const { Title } = Typography;

const UsersList = (props: TComponentWrap) => {
  // Navigation
  const { setSearchParams, searchParams } = useNavigation();
  const [form] = Form.useForm();

  // Params

  // Props
  const { users, columns } = props.state;
  const { deleteUsers } = props.handle;

  // State
  const [listTableIDSelected, setListTableIDSelected] = useState<any>([]);

  // Effect
  useEffect(() => {
    form.setFieldsValue({
      txt_keyword: searchParams.get('keyword'),
    });
  }, []);

  // Func
  const onSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.set('keyword', value);
        prev.set('page', '1');
        return prev;
      },
      { replace: true },
    );
  };

  const onRowSelected = (selectedRowKeys: any, selectedRows: any) => {
    setListTableIDSelected(selectedRows?.map((row: any) => row?.id));
  };

  return (
    <>
      {/* Title */}
      <Title level={3} style={{ color: COLOR.PRIMARY }}>
        User List
      </Title>
      {/* Actions */}
      <Form form={form} name='control-hooks' className='hiddenLabel' style={{ display: 'flex', flexDirection: 'column' }}>
        <Flex justify='space-between' align='center' style={{ marginBottom: 20 }}>
          {/* Search */}
          <Form.Item name='txt_keyword' style={{ marginBottom: 0, marginRight: 10 }}>
            <Search id='txt_keyword' placeholder='キーワード' allowClear enterButton='検索' size='large' onSearch={(value: string) => onSearch(value)} />
          </Form.Item>

          {/* Buttons */}
          <BoxFlex className='widthAuto btnActions'>
            <Space size={'middle'}>
              <Link to={PAGE_URL.AUTH.USER_ADD}>
                <Button
                  id='btn_add'
                  size='large'
                  className='btnPrimary btnLarge'
                  // onClick={() => gotoPage()}
                >
                  追加
                </Button>
              </Link>
            </Space>
          </BoxFlex>
        </Flex>

        {/* List Table */}
        <Flex className='usersTable' style={{ flex: 1 }}>
          <TableList value={users} columns={columns} onRowSelected={onRowSelected} />
        </Flex>

        <Flex vertical>
          <Space>
            <Button disabled={listTableIDSelected?.length <= 0} size='large' className='btnPrimary' onClick={() => deleteUsers(listTableIDSelected)}>
              チェックを削除
            </Button>
          </Space>

          <Pagination value={users} />
        </Flex>
      </Form>
    </>
  );
};

export default ComponentWrap(UsersList);
