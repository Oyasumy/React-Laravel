import { Button, Layout, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { COLOR, PAGE_URL, ROLE_ACCESS } from '@constants';
import { useAuthentication, useRedux } from '@hooks';
import { selectIsShowMenu, setShowMenu } from '@reducer/reducer/app';
import { selectUser } from '@reducer/reducer/user';

type TLayoutMain = {
  children: React.ReactNode;
};

const { Title } = Typography;

const { Sider } = Layout;
const LayoutMain = ({ children }: TLayoutMain) => {
  // Render JSX

  return (
    <Layout style={{ position: 'relative' }}>
      {SiderComponent()}
      <Layout className='site-layout' style={{ margin: 10, borderRadius: 6, height: 'calc(100vh - 20px)', display: 'flex' }}>
        <div className='flex column container alignSelfCenter fullWidth formAnt' style={{ height: '100%', overflowY: 'scroll' }}>
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

const listMenuItems = [
  {
    id: 1,
    link: PAGE_URL.AUTH.USER_LIST,
    title: 'User List',
    allows: [ROLE_ACCESS.ADMIN],
  },
  {
    id: 2,
    link: PAGE_URL.AUTH.STORE_LIST,
    title: 'Post List',
    allows: [ROLE_ACCESS.ADMIN, ROLE_ACCESS.LC],
  },
];

const SiderComponent = () => {
  // Hook
  const { select, dispatch } = useRedux();
  const auth = useAuthentication();

  // Values
  const isShow = select(selectIsShowMenu);
  const roleUser = select(selectUser)?.role;

  /**
   * Functions
   */
  const closeMenu = () => {
    dispatch(setShowMenu(true));
  };

  /**
   *
   * Render UI
   */
  const renderMenuItem = () => {
    return (
      <div>
        {listMenuItems.map((item: any) => {
          if (item?.space) return <div className='containerMenu' key={item?.id} style={{ width: '100%', height: 10 }} />;
          else
            return item.allows.includes(roleUser) ? (
              <Space
                className='containerMenu'
                key={item?.id}
                style={{
                  width: '-webkit-fill-available',
                  height: 'auto',
                  marginTop: item?.line || 'auto',
                }}
              >
                <div
                  className='indicator'
                  style={{
                    width: '3px',
                    height: '40px',
                    backgroundColor: COLOR.PRIMARY,
                    borderRadius: '5px',
                  }}
                />
                <Link onClick={() => closeMenu()} to={item?.link} className='listItemMenu' style={{ fontSize: 17 }}>
                  {item?.title}
                </Link>
              </Space>
            ) : null;
        })}
      </div>
    );
  };

  return (
    <Sider
      className='leftMenu'
      breakpoint='lg'
      collapsedWidth='0'
      collapsible
      collapsed={isShow}
      onCollapse={(value) => dispatch(setShowMenu(value))}
      style={{
        background: COLOR.LIGHT,
        margin: isShow ? 0 : 10,
        borderRadius: 6,
        // height: 'max-content',
      }}
    >
      {!isShow && (
        <>
          {' '}
          <Space>
            <Link to={PAGE_URL.AUTH.HOME}>
              <Title level={4} style={{ margin: '38px 20px', color: COLOR.PRIMARY }}>
                生活便利安心館
                <br />
                メンテナンス
              </Title>
            </Link>
          </Space>
          {renderMenuItem()}
          {/* button Logout */}
          <Space style={{ width: '100%', marginTop: 60, marginBottom: 23 }} direction='vertical' align='center'>
            <Button
              className='btnLogout'
              type='primary'
              onClick={() => {
                auth.signOut();
              }}
              style={{ minWidth: '150px', height: '50px', fontSize: '20px', borderRadius: 20 }}
              icon={<ArrowLeftOutlined />}
            >
              ログアウト
            </Button>
          </Space>
        </>
      )}
    </Sider>
  );
};
export default LayoutMain;
