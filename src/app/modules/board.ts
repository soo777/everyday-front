import { ActionType, createReducer, createAction } from 'typesafe-actions';

// const GET_BOARD_LIST = 'boardList/GET_BOARD_LIST' as const;
const GET_BOARD_LIST = 'board/GET_BOARD_LIST';
const SET_CREATE_BOARD_MODAL = 'board/SET_CREATE_BOARD_MODAL';
const SET_BOARD_MENU = 'board/SET_BOARD_MENU';
const SET_BOARD_HOST = 'board/SET_BOARD_HOST';

// export const getBoardList = (list:any) => ({
//   type: GET_BOARD_LIST,
//   payload: list,
// });
export const getBoardList = createAction(GET_BOARD_LIST)<any>();
export const setCreateBoardModal = createAction(SET_CREATE_BOARD_MODAL)<boolean>();
export const setBoardMenu = createAction(SET_BOARD_MENU)<string>();
export const setBoardHost = createAction(SET_BOARD_HOST)<string>();

// type BoardAction =
//   | ReturnType<typeof getBoardList>;
const actions = {
  getBoardList, setCreateBoardModal, setBoardMenu, setBoardHost,
};
type BoardAction = ActionType<typeof actions>;

type BoardState = {
  boardList: any,
  createBoardModal:boolean,
  boardMenu:string,
  boardHost:string,
}

const initialState: BoardState = {
  boardList: [],
  createBoardModal: false,
  boardMenu: '',
  boardHost: '',
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
  [SET_BOARD_MENU]: (state, action) => ({ ...state, boardMenu: action.payload }),
  [SET_BOARD_HOST]: (state, action) => ({ ...state, boardHost: action.payload }),
});

export default board;
