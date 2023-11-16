import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ja_JP';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@reducer/configStore';
import LoadingModal from '@components/Loading';
import { VALIDATE_MESSAGE } from '@/util/validate';
import ToastComponent from '@components/Toast';
import { ContextsProvider } from '@hooks';

import ConfigTheme from '../sass/theme';
import App from './src/navigation';

const MainSource = () => {
  return (
    <Provider store={store}>
      <ContextsProvider>
        <PersistGate loading={null} persistor={persistor}>
          <LoadingModal />
          <ConfigTheme>
            <ConfigProvider locale={locale} form={{ validateMessages: VALIDATE_MESSAGE }}>
              {/* Toast */}
              <ToastComponent />
              {/* Router */}
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ConfigProvider>
          </ConfigTheme>
        </PersistGate>
      </ContextsProvider>
    </Provider>
  );
};

export default MainSource;
