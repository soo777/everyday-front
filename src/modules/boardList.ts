const GET_BOARD_LIST = 'boardList/GET_BOARD_LIST' as const;

export const getBoardList = (list:any) => ({
  type: GET_BOARD_LIST,
  payload: list,
});

type BoardAction =
  | ReturnType<typeof getBoardList>;

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

function boardList(state:BoardListState = initialState, action: BoardAction) {
  switch (action.type) {
    case GET_BOARD_LIST:
      return action.payload;
    default:
      return state.boardList;
  }
}

export default boardList;
