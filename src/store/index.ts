import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer,
});

window.store = store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;