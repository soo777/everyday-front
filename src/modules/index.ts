import { combineReducers } from 'redux';
import boardList from './boardList';

const rootReducer = combineReducers({
  boardList,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
