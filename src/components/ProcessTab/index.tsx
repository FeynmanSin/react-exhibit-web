import { FC } from 'react';
import { Tabs } from 'antd';
import cn from 'classnames';


import { prettyCls } from '@/utils/prettyCls';

import './index.less';

const cls = prettyCls('process-tab');

const ProcessTab: FC<{
  navigationList: {
    value: number;
    name: string;
    count?: number;
  }[];
}> = ({ navigationList }) => {
  return (
    <Tabs
      className={cls()}
    // activeKey={tabsProps?.activeKey}
    // {...tabsProps}
    // onChange={handleOnChange}
    >
      {navigationList.map(({ value, name, count = 0 }) => (
        <Tabs.TabPane
          key={value}
          tab={(
            <span>
              {name}
              {count > 0 ? (
                <span
                  // className={cn('ml-1', value === Number(tabsProps.activeKey) ? 'text-br50' : 'text-color-3')}
                  className={cn('ml-1', 'text-color-3')}
                >
                  {count}
                </span>
              ) : null}
            </span>
          )}
        />
      ))}
    </Tabs>
  )
}

export default ProcessTab