import { FC } from 'react';

import './index.less';

import { prettyCls } from '@/utils/prettyCls';

import BaseContainer from '@/components/BaseContainer';

const cls = prettyCls('task');


const Task: FC = () => {
  return (
    <BaseContainer></BaseContainer>
  )
}

export default Task;