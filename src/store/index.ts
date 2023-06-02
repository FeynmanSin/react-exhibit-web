import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
const store = configureStore({
  reducer,
});

window.store = store;
export default store;