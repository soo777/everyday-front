type BoardListState = {
  board: object,
}

const initialState: BoardListState = {
  board: [
    'aaaaa',
    'bbbbb',
  ],
};

function boardList(state:BoardListState = initialState) {
  return state.board;
}

export default boardList;
