import React, { useEffect, useRef } from 'react';
import { Button, Space, Typography, Radio, Checkbox, Input, Form, FormInstance } from 'antd';

import ComponentWrap, { TComponentWrap } from './container';
import { useNavigation } from '@hooks';
import { BoxFlex } from '@components/Box';
import { COLOR, PAGE_URL } from '@constants';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Text, Title } = Typography;
const ManagerUser = (props: TComponentWrap) => {
  // Navigation
  const { gotoPage, goBack } = useNavigation();
  // Hook
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);

  // Props
  const { user } = props.state;
  const { createUser, updateUser } = props.handle;

  // Values
  const idUser = user?.id;

  // Effect Hook
  useEffect(() => {
    if (idUser) {
      // setIsActive(data?.data.is_deleted === 0 ? false : true);
      formRef.current?.setFieldsValue({
        email: user.email,
        name: user.name,
        role_id: user.role_id,
      });
    }
  }, [user]);

  // Functions
  const onFinish = (values: any) => {
    if (!idUser) {
      // Create User
      createUser(values);
    } else {
      // Update User
      updateUser(values);
    }
  };

  const onError = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form {...layout} colon={false} ref={formRef} form={form} name='control-hooks' className='hiddenLabel as formMain' onFinish={onFinish} onFinishFailed={onError}>
        <BoxFlex className='flexWrap justifyContentCenter' style={{ marginBottom: 50 }}>
          {/* Title */}
          <Title level={3} style={{ color: COLOR.PRIMARY, flex: 1, minWidth: 150, margin: '24px auto' }}>
            {idUser ? 'Edit User' : 'Add User'}
          </Title>
          {/* Buttons */}
          <BoxFlex className='widthAuto btnActions flexWrap alignItemsCenter'>
            {/* <Form.Item name='is_validity' label='' rules={[{ required: true }]} style={{ marginBottom: 0, height: 'auto' }}>
              <Radio.Group style={{ width: 'max-content' }}>
                <Radio value={0}>無効</Radio>
                <Radio value={1}>有効</Radio>
              </Radio.Group>
            </Form.Item> */}
            <Space>
              <Button size='large' ghost className='bolder btnAction' onClick={() => goBack()}>
                キャンセル
              </Button>
              <Button size='large' className='btnSecondary bolder btnAction' htmlType='submit'>
                保存
              </Button>
            </Space>
          </BoxFlex>
        </BoxFlex>

        {/* Email */}
        <Form.Item name='email' label='メールアドレス' rules={[{ required: true, type: 'email' }]}>
          <Input placeholder='メールアドレス' />
        </Form.Item>

        {/* Name */}
        <Form.Item name='name' label='ユーザー名' rules={[{ required: true }]}>
          <Input placeholder='ユーザー名' />
        </Form.Item>

        <Form.Item name='role_id' label='Role' rules={[{ required: true }]}>
          <Radio.Group value={1}>
            <Radio value={1}>Admin</Radio>
            <Radio value={2}>LC</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default ComponentWrap(ManagerUser);
