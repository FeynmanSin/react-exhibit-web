import { useEffect } from 'react';
import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import './index.less';
import useTheme from './hooks/useTheme';
import { darkTheme } from './themeToken';
import store from '@/store';


export default function Layout() {
  const { theme, onThemeChange } = useTheme();
  // 暂时写死系统模式 后端接口未开发 
  useEffect(() => {
    onThemeChange(0);
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: darkTheme
      }}
    >
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ConfigProvider >
  );
}
