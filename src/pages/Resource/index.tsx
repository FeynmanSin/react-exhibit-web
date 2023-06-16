import { FC, useMemo, useState, useEffect } from 'react';

import './index.less';

import { prettyCls } from '@/utils/prettyCls';

import { ResourceStatus } from '@/types/resource';
import { Button } from 'antd';

import Upload from '@/components/Upload';
import BaseContainer from '@/components/BaseContainer';
import ProcessTab from '@/components/ProcessTab';
import List from './components/List';
import Detail from './components/Detail';
import { useTypedSelector } from '@/store/reducers';
import { useAppDispatch } from '@/store';
import {
  updateCurrentTab,
  fetchStatusMap,
  getGroupViewSetting
} from '@/store/reducers/resource';


const cls = prettyCls('resource');

const Resource: FC = () => {
  const {
    currentTab: activeKey,
    processStatusMap,
  } = useTypedSelector((state) => ({
    currentTab: `${state.resource.currentTab}`,
    processStatusMap: state.resource.processStatusMap
  }));
  const dispatch = useAppDispatch();

  const navigationList = useMemo(() => [
    {
      key: ResourceStatus.ALL,
      label: '全部',
    },
    {
      key: ResourceStatus.NEW_RESOURCE,
      label: '新资源',
      count: processStatusMap[ResourceStatus.NEW_RESOURCE],
    },
    {
      key: ResourceStatus.PENDING_REVIEW,
      label: '待审核',
      count: processStatusMap[ResourceStatus.PENDING_REVIEW],
    },
    {
      key: ResourceStatus.UNDER_REVIEW,
      label: '审核中',
      count: processStatusMap[ResourceStatus.UNDER_REVIEW],
    },
    {
      key: ResourceStatus.Approved,
      label: '已审核',
    },
  ], [processStatusMap]);

  useEffect(() => {
    // 只有user存在时候才能进行资源列表fetch
    // console.log(">>>>>activeKey", activeKey)
    if (activeKey) {
      // 获取头部状态
      // preFetchList();
      dispatch(fetchStatusMap());
      dispatch(getGroupViewSetting(Number(activeKey)))
      //   .then(() => {
      //     fetchResourceListRef.current = dispatch(fetchResourceList());
      //   });
    }
  }, [dispatch, activeKey]);

  return (
    <BaseContainer detail={<Detail />} className={cls()}>
      <ProcessTab
        navigationList={navigationList}
        tabsProps={
          {
            activeKey,
            onChange: (key) => {
              dispatch(updateCurrentTab(key))
            }
          }
        }
      />
      <List />
      <Button>111</Button>
      <Upload />
    </BaseContainer>
  )
}

export default Resource;