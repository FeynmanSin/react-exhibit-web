import { Link, Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import './index.less';

export default function Layout() {
  return (
    <ConfigProvider >
      <Outlet />
    </ConfigProvider>
  );
}
