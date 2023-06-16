import { useEffect, useState } from 'react';
import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import './index.less';
import useTheme from './hooks/useTheme';
import { darkTheme } from './themeToken';
import store from '@/store';
import personalSettings from '@/apis/personalSettings';


export default function Layout() {
  const { theme, onThemeChange } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ; (async function () {
      const res = await personalSettings.getPersonalSettings();
      setIsLoading(false);
      onThemeChange(res?.extra.theme);
    })();
  }, [theme]);

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
