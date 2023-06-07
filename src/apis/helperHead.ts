import {
  collection,
  query,
  getDocs,
  where,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  collectionGroup
} from "firebase/firestore";

const db = window.db;

// todo: 获取ProcessTab 项数量
export const getHeadStatusList = async (helperTypeEnum: string) => {
  const headStatusLisRef = doc(db, "helperHead", "headStatusList");
  const docSnap = await getDoc(headStatusLisRef);
  if (docSnap.exists()) {
    return docSnap.data()[helperTypeEnum].filter(({ id }: { id: string, data: [] }) => id === 'SiNyqVRVtLTEqT7CbfjwCjxNlSJ2')[0];
  } else {
    console.log("No such document!");
    return null
  }

}
export const getSortableField = () => {

}
export const getViewSetting = () => {

}