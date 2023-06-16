import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ResourceStatus,
  HelperTypeEnum,
  ResourceViewSetting,
  ResourceListItem
} from '@/types/resource';
import helperHead from '@/apis/helperHead';
import type { RootState } from '.';



// 资源列表页面设置初始化数据
const initViewSetting = {
  settings: {
    searchParams: {
      group: {
        groupFields: [{ field: 'assetObjectVersionDefault', sortOrder: 'ASC' }],
      },
    },
  },
} as ResourceViewSetting;

//  初始化资源模块数据
const initialState = {
  currentTab: ResourceStatus.ALL,// 当前ProcessTab选中项
  processStatusMap: {  // 头部展示资源列表数据
    [ResourceStatus.NEW_RESOURCE]: 0,
    [ResourceStatus.PENDING_REVIEW]: 0,
    [ResourceStatus.UNDER_REVIEW]: 0,
  },
  processTabViewSettingMap: {// ProcessTab项的对应页面设置
    [ResourceStatus.ALL]: initViewSetting,
    [ResourceStatus.NEW_RESOURCE]: initViewSetting,
    [ResourceStatus.PENDING_REVIEW]: initViewSetting,
    [ResourceStatus.UNDER_REVIEW]: initViewSetting,
    [ResourceStatus.Approved]: initViewSetting,
  },
  // 列表数据
  list: [] as ResourceListItem[],
}

// todo: 更新当前选中的ProcessTab项
export const updateCurrentTab = createAction<string>('resource/updateCurrentTab');

// todo: 获取状态map
export const fetchStatusMap = createAsyncThunk('resource/fetchStatusMap', async () => {
  const response = await helperHead.getHeadStatusList(HelperTypeEnum.ASSET);
  return response;
});

// todo: 更新并保存视图操作
// export const saveViewSetting = createAsyncThunk(
//   'resource/saveViewSetting',
//   async (viewSettingSetting: Record<string, any>, { getState }) => {
//     const state = getState() as RootState;
//     const { currentTab, processTabViewSettingMap } = state.resource;
//     const viewSetting = processTabViewSettingMap[currentTab];
//     const { settings: { searchParams: { subject, ...rest } } } = viewSetting;
//     const res = helperHead.saveViewSetting()
//     return res;
//   },
// );

// todo: 获取用户分组的个人设置
export const getGroupViewSetting = createAsyncThunk('resource/getGroupViewSetting', async (tabId: number) => {
  const res = await helperHead.getViewSetting(HelperTypeEnum.ASSET, tabId);
  if (res) {
    if (!res.settings) {
      // 如果没有settings则默认给一个setting
      res.settings = {
        searchParams: {
          group: {
            groupFields: [{ field: 'assetObjectVersionDefault', sortOrder: 'ASC' }],
          },
          helperAssetChooseEnum: ResourceStatus.ALL,
        },
      };
    }
    return res.data as ResourceViewSetting;
  }
  return null;
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
      // 处理并保存头部数据
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
      // 处理用户上次页面的设置
      .addCase(getGroupViewSetting.fulfilled, (state, action) => {
        if (action.payload) {
          state.processTabViewSettingMap[state.currentTab] = action.payload;
        }
      })
  },
});

export default resourceSlice;