import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { getBoardList, setCreateBoardModal } from '../modules/board';

function useBoard() {
  const board = useSelector((state:RootState) => state.board);
  const dispatch = useDispatch();

  const getBoardListOn = useCallback(
    (list:any) => dispatch(getBoardList(list)),
    [dispatch],
  );

  const setCreateBoardModalOn = useCallback(
    (bool:boolean) => dispatch(setCreateBoardModal(bool)),
    [dispatch],
  );

  return {
    board,
    getBoardListOn,
    setCreateBoardModalOn,
  };
}

export default useBoard;
