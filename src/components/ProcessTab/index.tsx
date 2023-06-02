import { FC, useState, useEffect } from 'react';
import { TabsProps, Tabs } from 'antd'
import cn from 'classnames';

import { prettyCls } from '@/utils/prettyCls';

import './index.less';



const cls = prettyCls('process-tab');

const ProcessTab: FC<{
  navigationList: {
    key: number;
    label: string;
    count?: number;
  }[];
  tabsProps: TabsProps;
}> = ({ navigationList, tabsProps }) => {
  const [items, setItems] = useState<TabsProps['items']>();
  useEffect(() => {
    getItems();
  }, [navigationList, tabsProps]);

  const getItems = () => {
    const _items = navigationList.map((item) => {
      if (item?.count && item.count > 0) {
        return {
          key: String(item.key),
          label: (
            <span>
              {item.label}
              <span
                className={cn('ml-1', item.key === Number(tabsProps.activeKey) ? 'text-br50' : 'text-color-3')}
              >
                {item.count}
              </span>
            </span>
          )
        }
      }
      return { key: String(item.key), label: item.label };
    });
    setItems(_items);
  }

  const handleChange: TabsProps['onChange'] = (key) => {
    if (tabsProps?.onChange) {
      tabsProps.onChange(key);
    }
  }

  return (
    <Tabs
      className={cls()}
      items={items}
      tabBarGutter={16}
      activeKey={tabsProps.activeKey}
      onChange={handleChange}
      {...tabsProps}
    />
  )
}

export default ProcessTab