import { doc, getDoc } from "firebase/firestore";
const db = window.db;
// todo: 获取头部信息
const getHeadStatusList = async (helperTypeEnum: string) => {
  const docRef = doc(db, "headStatusList", "SiNyqVRVtLTEqT7CbfjwCjxNlSJ2");
  const res = (await getDoc(docRef)).data();
  if (res) {
    return res[helperTypeEnum];
  } else {
    return null;
  }
}

// todo: 获取头部选项对应页面设置
const getViewSetting = async (helperTypeEnum: string, tabId: number) => {
  const docRef = doc(db, "viewSetting", "SiNyqVRVtLTEqT7CbfjwCjxNlSJ2");
  const res = await (await getDoc(docRef)).data();
  if (res) {
    return res[helperTypeEnum][tabId];
  } else {
    return null;
  }

}


// todo: 保存头部项对应页面设置
const saveViewSetting = async () => {

}
export default {
  getHeadStatusList,
  getViewSetting,
  saveViewSetting
}