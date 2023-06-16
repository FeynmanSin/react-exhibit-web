import { FC } from 'react';
import type { MenuProps } from 'antd';
import { prettyCls } from '@/utils/prettyCls';
import Filter from '@/components/Filter';
import './index.less'

const cls = prettyCls('resource-list');


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];



const List: FC = () => {
  return (
    <div className={cls()}>
      <Filter groupingSortProps={{ items }} />
    </div>
  )
}

export default List;