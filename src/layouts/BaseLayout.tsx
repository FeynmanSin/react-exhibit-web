import React, { FC } from 'react'
import { prettyCls } from '@/utils/prettyCls';
import { NavLink, Outlet } from 'umi';
import classNames from 'classnames';
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
  return (
    <main className={cls()}>
      <nav className={cls('nav')}>
        {
          navigationList.map(({ to, name, type, Icon }) => (
            <NavLink className={cls('nav-item')} to={to} key={type}>
              <Icon size={20} />
              <span>{name}</span>
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