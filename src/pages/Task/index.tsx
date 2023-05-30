import { FC } from 'react';

import './index.less';

import { prettyCls } from '@/utils/prettyCls';

import BaseContainer from '@/components/BaseContainer';
import List from './components/List';
import Detail from './components/Detail';

const cls = prettyCls('task');


const Task: FC = () => {
  return (
    <BaseContainer detail={<Detail />} className={cls()}>
      <List />
    </BaseContainer>
  )
}

export default Task;