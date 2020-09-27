import { ActionType, createReducer, createAction } from 'typesafe-actions';

// const GET_BOARD_LIST = 'boardList/GET_BOARD_LIST' as const;
const GET_BOARD_LIST = 'board/GET_BOARD_LIST';
const SET_CREATE_BOARD_MODAL = 'board/SET_CREATE_BOARD_MODAL';

// export const getBoardList = (list:any) => ({
//   type: GET_BOARD_LIST,
//   payload: list,
// });
export const getBoardList = createAction(GET_BOARD_LIST)<any>();
export const setCreateBoardModal = createAction(SET_CREATE_BOARD_MODAL)<boolean>();

// type BoardAction =
//   | ReturnType<typeof getBoardList>;
const actions = { getBoardList, setCreateBoardModal };
type BoardAction = ActionType<typeof actions>;

type BoardState = {
  boardList: any,
  createBoardModal:boolean,
}

const initialState: BoardState = {
  boardList: [
    { id: 'board1', boardName: 'board1' },
    { id: 'board2', boardName: 'board2' },
    { id: 'board3', boardName: 'board3' },
  ],
  createBoardModal: false,
};

// function boardList(state:BoardState = initialState, action: BoardAction) {
//   switch (action.type) {
//     case GET_BOARD_LIST:
//       return { ...state, boardList: action.payload };
//     default:
//       return state;
//   }
// }
const board = createReducer<BoardState, BoardAction>(initialState, {
  [GET_BOARD_LIST]: (state, action) => ({ ...state, boardList: action.payload }),
  [SET_CREATE_BOARD_MODAL]: (state, action) => ({ ...state, createBoardModal: action.payload }),
});

export default board;
