import { FC } from 'react';

import { prettyCls } from '@/utils/prettyCls';

import './index.less';

const cls = prettyCls('process-tab')

const ProcessTab: FC<{
  navigationList: {
    value: number;
    name: string;
    count?: number;
  }[];
}> = ({ navigationList }) => {
  return (
    <div className={cls()}>
      {
        navigationList.map(item =>
        (
          <div>{item.name}</div>
        )
        )
      }
    </div>
  )
}

export default ProcessTab