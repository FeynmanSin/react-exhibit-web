import { combineReducers } from 'redux';

import resource from './resource';

const rootReducer = combineReducers({
  resource: resource.reducer
});

export default rootReducer;
