import { FC } from 'react';
import { Space, Input, Button } from 'antd';
import { GroupOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import GroupingSort, { GroupingSortProps } from '../GroupingSort';
import { prettyCls } from '@/utils/prettyCls';
import './index.less';

const cls = prettyCls('components-filter');

const Filter: FC<{
  groupingSortProps: GroupingSortProps
}> = ({
  groupingSortProps
}) => {
    return (
      <Space size={8} className={cls()}>
        <Input.Search />
        <GroupingSort {...groupingSortProps}>
          <Button className='' icon={<GroupOutlined />} />
        </GroupingSort>
      </Space >
    )
  }

export default Filter