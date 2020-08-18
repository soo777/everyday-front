type BoardListState = {
  board: any,
}

const initialState: BoardListState = {
  board: [
    'board1',
    'board2',
    'board3',
  ],
};

function boardList(state:BoardListState = initialState) {
  return state.board;
}

export default boardList;
