import { combineReducers } from 'redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import resource from './resource';

const rootReducer = combineReducers({
  resource: resource.reducer
});


export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
