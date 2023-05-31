import { useEffect } from 'react';
import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import './index.less';
import useTheme from './hooks/useTheme';

export default function Layout() {
  const { theme, onThemeChange } = useTheme();
  useEffect(() => {
    onThemeChange(0);
  }, [])
  return (
    <ConfigProvider >
      <Outlet />
    </ConfigProvider>
  );
}
