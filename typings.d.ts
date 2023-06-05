import 'umi/typings';
import type { Firestore } from 'firebase';
declare global {
  declare interface Window {
    theme: number,
    store: any,
    db: Firestore
  }
}