import { FC, PropsWithChildren } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';


export type GroupingSortProps = MenuProps;

const GroupingSort: FC<PropsWithChildren<GroupingSortProps>> = ({
  items,
  children
}) => {
  return (
    <Dropdown menu={{ items }}>
      {children}
    </Dropdown>
  )
}

export default GroupingSort;