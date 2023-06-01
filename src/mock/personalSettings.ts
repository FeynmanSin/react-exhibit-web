import { defineMock } from 'umi';

export default defineMock({
  'GET /api/getOneSetting': [
    {
      id: 1,
      /** 预留字段 */
      extra: { them: 1 },
    },
  ],
})