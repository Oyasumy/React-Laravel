import { Link } from 'react-router-dom';
import { Button, Form, Input, Space, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { COLOR, PAGE_URL } from '@constants';

import ContainerWrap, { TContainerLogin } from './container';
import { usePokemon } from './hook';
// import { COLOR, PAGE_URL } from '../../../constants';

const { Title } = Typography;

function LoginPage(props: TContainerLogin) {
  // import ANT
  const [form] = Form.useForm();

  const pokemon = usePokemon();

  const onFinish = (values: { email: string; password: string }) => {
    props.handle.handleLogin(values?.email, values?.password);

    console.log('base props', props);
  };

  console.log({ pokemon });

  return (
    <div className='login'>
      <div className='container'>
        <div className='form' style={{ backgroundColor: 'rgb(255, 255, 255,0.75)', padding: '30px 20px', borderRadius: 10 }}>
          <Title className='title' style={{ marginTop: 0, textAlign: 'center', color: COLOR.PRIMARY }}>
            ログイン
          </Title>
          <p>{pokemon?.poke?.name}</p>
          <Form form={form} name='control-login' className='formLogin hiddenLabel' onFinish={onFinish}>
            <Form.Item validateStatus='success' name='email' label='メールアドレス' labelCol={{ span: 0 }} rules={[{ required: true, type: 'email' }]} style={{}}>
              <Input placeholder='メールアドレス' id='name' style={{ height: '50px' }} />
            </Form.Item>
            <Form.Item name='password' label='パスワード' labelCol={{ span: 0 }} validateStatus='success' rules={[{ required: true, type: 'string' }, { min: 8 }]}>
              <Input placeholder='パスワード' id='password' type='password' style={{ height: '50px' }} />
            </Form.Item>

            {/* Forget Password */}
            <Space align='center' style={{ width: '100%', justifyContent: 'center' }}>
              <Link to={PAGE_URL.AUTH.FORGET_PASSWORD}>Forget Password</Link>
            </Space>

            {/* Login Btn */}
            <Space align='center' style={{ width: '100%', justifyContent: 'center' }}>
              <Form.Item>
                <Button className='btnLogin' type='primary' htmlType='submit' style={{ minWidth: '150px', height: '50px', fontSize: '20px' }}>
                  送信
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

export default ContainerWrap(LoginPage);
