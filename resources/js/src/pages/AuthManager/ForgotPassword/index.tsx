import { Button, Form, Input, Space, Typography } from 'antd';

import { COLOR } from '@constants';

import ContainerWrap, { TContainerResetPassword } from './container';

const { Title } = Typography;

function ForgetPasswordPage(props: TContainerResetPassword) {
  // import ANT
  const [form] = Form.useForm();

  // Functions
  const onFinish = (values: { email: string }) => {
    props.handle.handReset(values?.email);
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='form' style={{ backgroundColor: 'rgb(255, 255, 255,0.75)', padding: '30px 20px', borderRadius: 10 }}>
          <Title className='title' style={{ marginTop: 0, textAlign: 'center', color: COLOR.PRIMARY }}>
            Forgot Password
          </Title>
          <Form form={form} name='control-login' className='formLogin hiddenLabel' onFinish={onFinish}>
            {/* Email */}
            <Form.Item name='email' label='メールアドレス' labelCol={{ span: 0 }} validateStatus='success' rules={[{ required: true, type: 'email' }]}>
              <Input placeholder='メールアドレス' id='email' type='text' style={{ height: '50px' }} />
            </Form.Item>

            <Space align='center' style={{ width: '100%', justifyContent: 'center' }}>
              <Form.Item>
                <Button className='btnLogin' type='primary' htmlType='submit' style={{ minWidth: '150px', height: '50px', fontSize: '20px' }}>
                  Submit
                  {/* <ArrowRightOutlined /> */}
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ContainerWrap(ForgetPasswordPage);
