import { FC } from 'react';

import { prettyCls } from '@/utils/prettyCls';
import './index.less';

const cls = prettyCls('task-detail');

const Detail: FC = () => {
  return (
    <div className={cls()}>Detail</div>
  )
}

export default Detail;