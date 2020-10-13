import { combineReducers } from 'redux';
import board from './board';
import item from './item';
import user from './user';

const rootReducer = combineReducers({
  board,
  item,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
