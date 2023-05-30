import { FC, PropsWithChildren, ReactNode } from 'react';

import { prettyCls } from '@/utils/prettyCls';

import './index.less'

const cls = prettyCls('base');

const BaseContainer: FC<PropsWithChildren<{
  detail: ReactNode;
  className?: string;
}>> = ({
  detail,
  className,
  children
}) => {
    return (
      <div className={cls()}>
        <div className={cls('detail')}>
          {detail}
        </div>
        <div className={cls('list')}>
          {children}
        </div>
      </div>
    )
  }

export default BaseContainer