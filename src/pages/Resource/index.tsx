import { FC, useMemo } from 'react';

import './index.less';

import { prettyCls } from '@/utils/prettyCls';

import { ResourceStatus } from '@/types/resource';
import { Button } from 'antd';

import BaseContainer from '@/components/BaseContainer';
import ProcessTab from '@/components/ProcessTab';
import List from './components/List';
import Detail from './components/Detail';

const cls = prettyCls('resource');


const Task: FC = () => {

  const navigationList = useMemo(() => [
    {
      key: ResourceStatus.ALL,
      label: '全部',
    },
    {
      key: ResourceStatus.NEW_RESOURCE,
      label: '新资源',
      // count: processStatusMap[ResourceStatus.NEW_RESOURCE],
      count: 113,
    },
    {
      key: ResourceStatus.PENDING_REVIEW,
      label: '待审核',
      // count: processStatusMap[ResourceStatus.PENDING_REVIEW],
      count: 44


    },
    {
      key: ResourceStatus.UNDER_REVIEW,
      label: '审核中',
      // count: processStatusMap[ResourceStatus.UNDER_REVIEW],
      count: 300

    },
    {
      key: ResourceStatus.Approved,
      label: '已审核',
    },
    // ], [processStatusMap]);
  ], []);


  return (
    <BaseContainer detail={<Detail />} className={cls()}>
      <ProcessTab
        navigationList={navigationList}
        tabsProps={
          {
            activeKey: 0
          }
        }
      />
      <List />
      <Button>111</Button>
    </BaseContainer>
  )
}

export default Task;