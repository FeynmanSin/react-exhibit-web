import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResourceStatus, HelperTypeEnum } from '@/types/resource';
import { getHeadStatusList } from '@/apis/helperHead';

//  初始化资源模块数据
const initialState = {
  currentTab: ResourceStatus.ALL,// 当前ProcessTab选中项
  processStatusMap: {  // 头部展示资源列表数据
    [ResourceStatus.NEW_RESOURCE]: 0,
    [ResourceStatus.PENDING_REVIEW]: 0,
    [ResourceStatus.UNDER_REVIEW]: 0,
  },
}

// todo: 更新当前选中的ProcessTab项
export const updateCurrentTab = createAction<string>('resource/updateCurrentTab');

// todo: 获取状态map
export const fetchStatusMap = createAsyncThunk('resource/fetchStatusMap', async () => {
  const response = await getHeadStatusList(HelperTypeEnum.ASSET);
  return response;
});


const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // 保存当前资源页面tab
      .addCase(updateCurrentTab, (state, action) => {
        state.currentTab = Number(action.payload) as ResourceStatus;
      })
      .addCase(fetchStatusMap.fulfilled, (state, action) => {
        if (action.payload) {
          // 对返回的结果数据从字符串换成对应的编号
          state.processStatusMap = Object.fromEntries(Object.entries(action.payload).map(([key, value]) => {
            switch (key) {
              case 'newAssetSize': {
                return [ResourceStatus.NEW_RESOURCE, value];
              }
              case 'toReviewerSize': {
                return [ResourceStatus.PENDING_REVIEW, value];
              }
              case 'inReviewerSize': {
                return [ResourceStatus.UNDER_REVIEW, value];
              }
              default: {
                return [];
              }
            }
          }));
        }
      })
  },
});

export default resourceSlice;