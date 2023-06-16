import { doc, getDoc, updateDoc } from "firebase/firestore";
const db = window.db;
// todo: 获取用户设置
const getPersonalSettings = async () => {
  const docRef = doc(db, "personalSettings", "SiNyqVRVtLTEqT7CbfjwCjxNlSJ2");
  const res = (await getDoc(docRef)).data();
  if (res) {
    return res;
  } else {
    return null;
  }
}

// todo: 保存用户设置
const updatePersonalSettings = async (theme: number) => {
  const docRef = doc(db, "personalSettings", "SiNyqVRVtLTEqT7CbfjwCjxNlSJ2");
  const res = await updateDoc(docRef, { theme });
}

export default {
  getPersonalSettings,
  updatePersonalSettings
}