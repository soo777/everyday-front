import { combineReducers } from 'redux';
import board from './board';
import item from './item';

const rootReducer = combineReducers({
  board,
  item,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
