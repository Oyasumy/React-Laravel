import { ConfigProvider } from 'antd';
import { COLOR } from '../js/src/constants';

const theme = {
  token: {
    colorPrimary: COLOR.PRIMARY,
  },
};

const ConfigTheme = ({ children }: { children: JSX.Element }) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};
export default ConfigTheme;
