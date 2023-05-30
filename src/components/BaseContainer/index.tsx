import { FC } from 'react';

import { prettyCls } from '@/utils/prettyCls';

import './index.less'

const cls = prettyCls('base');

const BaseContainer: FC = () => {
  return (
    <div className={cls()}>BaseContainer</div>
  )
}

export default BaseContainer