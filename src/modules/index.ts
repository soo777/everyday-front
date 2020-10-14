import { combineReducers } from 'redux';
import board from './board';
import item from './item';
import user from './user';
import common from './common';

const rootReducer = combineReducers({
  board,
  item,
  user,
  common,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
