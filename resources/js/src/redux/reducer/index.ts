import { combineReducers } from 'redux';
import { RootState, AppDispatch } from '../configStore';

import app, { initialState as appSession } from './app';
import user, { initialState as userSession } from './user';

const combineReducer = combineReducers({
  app,
  user,
});

const rootReducer: any = (state: RootState, action: any) => {
  return combineReducer(state, action);
};

export default rootReducer;
