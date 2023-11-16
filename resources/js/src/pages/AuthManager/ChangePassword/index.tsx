import { Button, Form, Input, Space, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { COLOR } from '@constants';

import ContainerWrap, { TContainerResetPassword } from './container';

const { Title } = Typography;

function ResetPasswordPage(props: TContainerResetPassword) {
  // import ANT
  const [form] = Form.useForm();

  const onFinish = (values: { password: string; confirmPassword: string }) => {
    const { password, confirmPassword } = values;

    if (!password || !confirmPassword) return;

    props.handle.handReset(password, confirmPassword);
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='form' style={{ backgroundColor: 'rgb(255, 255, 255,0.75)', padding: '30px 20px', borderRadius: 10 }}>
          <Title className='title' style={{ marginTop: 0, textAlign: 'center', color: COLOR.PRIMARY }}>
            Change Password
          </Title>
          <Form form={form} name='control-login' className='formLogin hiddenLabel' onFinish={onFinish}>
            <Form.Item name='password' label='パスワード' labelCol={{ span: 0 }} validateStatus='success' rules={[{ required: true, type: 'string' }, { min: 8 }]}>
              <Input placeholder='パスワード' id='password' type='password' style={{ height: '50px' }} />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              label=''
              labelCol={{ span: 0 }}
              validateStatus='success'
              rules={[
                { required: true, type: 'string' },
                { min: 8 },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input placeholder='パスワードを認証する' id='confirmPassword' type='password' style={{ height: '50px' }} />
            </Form.Item>

            <Space align='center' style={{ width: '100%', justifyContent: 'center' }}>
              <Form.Item>
                <Button className='btnLogin' type='primary' htmlType='submit' style={{ minWidth: '150px', height: '50px', fontSize: '20px' }}>
                  Change
                  <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ContainerWrap(ResetPasswordPage);
