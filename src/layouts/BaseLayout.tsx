import { FC, useMemo } from 'react'
import { prettyCls } from '@/utils/prettyCls';
import { NavLink, Outlet, useLocation } from 'umi';
import cn from 'classnames';
import { CarryOutOutlined, FolderOutlined } from '@ant-design/icons';
import './BaseLayout.less';

const cls = prettyCls('main');
const navigationList = [
  {
    to: '/task',
    name: '任务',
    type: 'task',
    Icon: CarryOutOutlined
  },
  {
    to: '/resource',
    name: '资源',
    type: 'resource',
    Icon: FolderOutlined
  },
];

const BaseLayout: FC = () => {

  const location = useLocation();
  const activeKey = useMemo(() => location.pathname, [location]);//当前路由地址

  return (
    <main className={cls()}>
      <nav className={cls('nav')}>
        {
          navigationList.map(({ to, name, type, Icon }) => (
            <NavLink className={cn(cls('nav-item'), { active: activeKey === to })} to={to} key={type}>
              <Icon size={20} />
              <span className="mt-1 text-sm">{name}</span>
            </NavLink>
          ))
        }
      </nav>
      <div className={cls('content')}>
        <Outlet />
      </div>
    </main>
  )
}

export default BaseLayout;