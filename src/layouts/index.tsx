import { useEffect } from 'react';
import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import './index.less';
import useTheme from './hooks/useTheme';
import { darkTheme } from './themeToken';
import store from '@/store';
import useRequest from '../hooks/useRequest';


export default function Layout() {
  const { theme, onThemeChange } = useTheme();
  const { resData, isLoading } = useRequest('personalSettings');
  useEffect(() => {
    onThemeChange(resData?.extra.theme);
  }, [resData])
  return (
    <ConfigProvider
      theme={{
        token: darkTheme
      }}
    >
      <Provider store={store}>
        {
          !isLoading && <Outlet />
        }
      </Provider>
    </ConfigProvider >
  );
}
