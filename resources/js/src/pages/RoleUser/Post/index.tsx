import { Link } from 'react-router-dom';
import { Image, Input, Layout, Space, Typography, Flex, DatePicker, Select, Checkbox, Button, Radio, Tabs } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { SearchOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

import { COLOR } from '@constants';
import CheckBox from '@components/CheckBox';

const { Title } = Typography;

const { RangePicker } = DatePicker;
const PostUser = () => {
  return (
    <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Title level={5} style={{ margin: 0 }}>
              全国の焼肉
            </Title>

            <Space style={{ lineHeight: 'initial' }}>
              <Link to={''}>食べログについて</Link>
              <Link to={''}>保有Tポイント</Link>
              <Link to={''}>食べログについて</Link>
            </Space>
          </Space>
          {/* Logo */}
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space>
              <Image width={75} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
            </Space>
            {/* Search */}
            <Space>
              <Space.Compact size='large'>
                <Input placeholder='another input' />
                <Input addonAfter={<SearchOutlined />} placeholder='large size' />
              </Space.Compact>
            </Space>
          </Space>
        </Header>
        {/* Break cum */}
        <Space style={{ width: '100%', paddingInline: 20, marginBlock: 10, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Title level={5} style={{ margin: 0 }}>
              全国の焼肉
            </Title>
          </Space>

          <Space>
            <Title level={5} style={{ margin: 0 }}>
              852,639店舗 ｜56,881,503口コミ
            </Title>
          </Space>
        </Space>

        <Layout hasSider style={{ paddingInline: 20 }} className='formAntFE'>
          <Sider width={'30%'} style={siderStyle}>
            <Layout style={{ border: '1px solid #EEECE4', paddingBottom: 10 }}>
              <Flex gap='middle' justify='center' align='center' vertical style={{ backgroundColor: COLOR.LIGHT }}>
                <Title level={5} style={{ margin: 0, width: '100%', textAlign: 'left', paddingInline: 10, paddingBlock: 4, backgroundColor: '#FAF8F5' }}>
                  予算
                </Title>
                <RangePicker style={{ marginTop: 10, width: '90%' }} />
                <Title level={5} style={{ margin: 0, width: '100%', textAlign: 'left', paddingInline: 10, paddingBlock: 4, backgroundColor: '#FAF8F5' }}>
                  空席確認・ネット予約
                </Title>
                {/* Select */}
                <Flex vertical className='fullWidth' style={{ paddingInline: 20 }}>
                  <Flex align='center' justify='space-between'>
                    <Title level={5} style={{ margin: 0 }}>
                      来店日
                    </Title>
                    <Select defaultValue='lucy' style={{ width: 120 }} options={[{ value: 'lucy', label: 'Lucy' }]} />
                  </Flex>

                  {/* Select */}
                  <CheckBox onChange={() => {}}>ネット予約可（日時指定なし）</CheckBox>
                  <CheckBox onChange={() => {}}>席のみ予約</CheckBox>

                  {/* Radio */}

                  <Radio.Group onChange={() => {}} value={1}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                  </Radio.Group>
                  {/* Button */}
                  <Button type='primary' style={{ marginTop: 10 }}>
                    Primary Button
                  </Button>
                </Flex>
              </Flex>
            </Layout>
          </Sider>
          {/* Main */}
          <Content style={contentStyle}>
            {/* Tabs */}
            <Flex vertical style={{ backgroundColor: '#FAF8F5' }}>
              <Title level={3} style={{ margin: 20, width: '100%', textAlign: 'left', paddingInline: 10, paddingBlock: 4 }}>
                予算
              </Title>

              {/* Tabs */}
              <Tabs
                className='fullTabs'
                onChange={() => {}}
                type='card'
                items={new Array(3).fill(null).map((_, i) => {
                  const id = String(i + 1);
                  return {
                    label: `Tab ${id}`,
                    key: id,
                    children: `Content of Tab Pane ${id}`,
                  };
                })}
              />
            </Flex>

            {/* Items */}
            <Flex style={{ width: '100%' }}>
              <Flex style={{ width: '100%' }}>
                <Flex vertical style={{ maxWidth: '30%' }}>
                  <Image width={220} height={220} style={{ objectFit: 'cover' }} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />

                  <Flex style={{ gap: 2, height: 70 }}>
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    />
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://images.unsplash.com/photo-1696855179885-216725c8f4dc?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&w=800'
                    />
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://images.unsplash.com/photo-1697553503153-7db77aade671?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&w=800'
                    />
                  </Flex>
                </Flex>
                <Flex vertical style={{ paddingInline: 20, flex: 1 }}>
                  <Title level={3} style={{ textAlign: 'left', margin: 0, paddingBlock: 4 }}>
                    焼肉食堂 ニクヤノシゴト
                  </Title>
                  <Title level={5} style={{ textAlign: 'left', margin: 0 }}>
                    [東京] 大門駅 133m / 焼肉、ホルモン、居酒屋
                  </Title>

                  {/* Stars */}

                  <Flex style={{ paddingBlock: 10, gap: 5 }}>
                    <StarFilled style={{ color: 'orange', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex style={{ width: '100%' }}>
              <Flex style={{ width: '100%' }}>
                <Flex vertical style={{ maxWidth: '30%' }}>
                  <Image width={220} height={220} style={{ objectFit: 'cover' }} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />

                  <Flex style={{ gap: 2, height: 70 }}>
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    />
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://images.unsplash.com/photo-1696855179885-216725c8f4dc?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&w=800'
                    />
                    <Image
                      preview={false}
                      width={'100%'}
                      // height={80}
                      style={{ objectFit: 'cover', verticalAlign: 'baseline', flex: 1, height: 50 }}
                      src='https://images.unsplash.com/photo-1697553503153-7db77aade671?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&w=800'
                    />
                  </Flex>
                </Flex>
                <Flex vertical style={{ paddingInline: 20, flex: 1 }}>
                  <Title level={3} style={{ textAlign: 'left', margin: 0, paddingBlock: 4 }}>
                    焼肉食堂 ニクヤノシゴト
                  </Title>
                  <Title level={5} style={{ textAlign: 'left', margin: 0 }}>
                    [東京] 大門駅 133m / 焼肉、ホルモン、居酒屋
                  </Title>

                  {/* Stars */}

                  <Flex style={{ paddingBlock: 10, gap: 5 }}>
                    <StarFilled style={{ color: 'orange', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                    <StarOutlined style={{ color: 'black', fontSize: 30 }} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Content>
        </Layout>

        <Footer style={footerStyle}>
          <Title level={5} style={{ textAlign: 'center', margin: 0, fontSize: 12, fontWeight: '100' }}>
            ヘルプ・お問い合わせ| 食べログについて| 口コミ・ランキングに対する取り組み| 飲食店・飲食企業様向けサービスについて| 広告（メーカー・団体様等向け）について 機能改善要望|
            口コミガイドライン| 食べログプレミアム| 食べログプレミアム無料クーポン| 利用規約| 外部送信（オプトアウト）| 個人情報保護方針| 採用情報| 企業情報 サイトマップ|
            キーワード一覧| チェーン店一覧
          </Title>
          <Flex style={{ width: '100%', backgroundColor: COLOR.LIGHT }}>
            <Title level={5} style={{ textAlign: 'center', width: '100%', fontSize: 12, fontWeight: '100' }}>
              言語 English 简体中文 繁體中文 한국어
            </Title>
          </Flex>
          <Title level={5} style={{ textAlign: 'center', width: '100%', fontSize: 12, fontWeight: '100' }}>
            Copyright (c) Kakaku.com, Inc. All Rights Reserved. 無断転載禁止
          </Title>
        </Footer>
      </Layout>
    </Space>
  );
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 'auto',
  paddingInline: 30,
  paddingBlock: 10,
  lineHeight: 'initial',
  backgroundColor: COLOR.LIGHT,

  borderBottom: '.5px solid black',
  // display: 'flex',
  // justifyContent: 'space-between',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',

  paddingInline: 20,
  // backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: COLOR.LIGHT,
  paddingInline: 20,
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FAF8F5',
};

export default PostUser;
