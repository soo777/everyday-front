import { combineReducers } from 'redux';
import board from './board';
import item from './item';
import user from './user';
import common from './common';
import modal from './modal';

const rootReducer = combineReducers({
  board,
  item,
  user,
  common,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
