import { FC, useMemo } from 'react';

import './index.less';

import { prettyCls } from '@/utils/prettyCls';

import { ResourceStatus } from '@/types/resource';

import BaseContainer from '@/components/BaseContainer';
import ProcessTab from '@/components/ProcessTab';
import List from './components/List';
import Detail from './components/Detail';

const cls = prettyCls('resource');


const Task: FC = () => {

  const navigationList = useMemo(() => [
    {
      value: ResourceStatus.ALL,
      name: '全部',
    },
    {
      value: ResourceStatus.NEW_RESOURCE,
      name: '新资源',
      // count: processStatusMap[ResourceStatus.NEW_RESOURCE],
      count: 113
    },
    {
      value: ResourceStatus.PENDING_REVIEW,
      name: '待审核',
      // count: processStatusMap[ResourceStatus.PENDING_REVIEW],
      count: 0


    },
    {
      value: ResourceStatus.UNDER_REVIEW,
      name: '审核中',
      // count: processStatusMap[ResourceStatus.UNDER_REVIEW],
      count: 0

    },
    {
      value: ResourceStatus.Approved,
      name: '已审核',
    },
    // ], [processStatusMap]);
  ], []);


  return (
    <BaseContainer detail={<Detail />} className={cls()}>
      <ProcessTab
        navigationList={navigationList}
      />
      <List />
    </BaseContainer>
  )
}

export default Task;