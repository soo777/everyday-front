import { ActionType, createReducer, createAction } from 'typesafe-actions';

// const GET_BOARD_LIST = 'boardList/GET_BOARD_LIST' as const;
const GET_BOARD_LIST = 'boardList/GET_BOARD_LIST';

// export const getBoardList = (list:any) => ({
//   type: GET_BOARD_LIST,
//   payload: list,
// });
export const getBoardList = createAction(GET_BOARD_LIST)<any>();

// type BoardAction =
//   | ReturnType<typeof getBoardList>;
const actions = { getBoardList };
type BoardListAction = ActionType<typeof actions>;

type BoardListState = {
  boardList: any,
  aaa:string,
}

const initialState: BoardListState = {
  boardList: [
    { id: 'board1', boardName: 'board1' },
    { id: 'board2', boardName: 'board2' },
    { id: 'board3', boardName: 'board3' },
  ],
  aaa: 'aaa',
};

// function boardList(state:BoardListState = initialState, action: BoardAction) {
//   switch (action.type) {
//     case GET_BOARD_LIST:
//       return { ...state, boardList: action.payload };
//     default:
//       return state;
//   }
// }
const boardList = createReducer<BoardListState, BoardListAction>(initialState, {
  [GET_BOARD_LIST]: (state, action) => ({ ...state, boardList: action.payload }),
});

export default boardList;
