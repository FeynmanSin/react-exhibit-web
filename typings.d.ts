import 'umi/typings';
import type { Firestore } from 'firebase';
import type { Axios } from 'axios';
declare global {
  declare interface Window {
    theme: number,
    store: any,
    db: Firestore,
    axios: Axios;
  }
}