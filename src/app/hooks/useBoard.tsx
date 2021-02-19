import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'app/modules';
import { getBoardList, setBoardMenu, setCreateBoardModal, setBoardHost } from 'app/modules/board';

function useBoard() {
  const board = useSelector((state:RootState) => state.board);
  const dispatch = useDispatch();

  const getBoardListFn = useCallback(
    (list:any) => dispatch(getBoardList(list)),
    [dispatch],
  );

  const setCreateBoardModalFn = useCallback(
    (bool:boolean) => dispatch(setCreateBoardModal(bool)),
    [dispatch],
  );

  const setBoardMenuFn = useCallback(
    (boardMenu:string) => dispatch(setBoardMenu(boardMenu)),
    [dispatch],
  );

  const setBoardHostFn = useCallback(
    (boardHost:string) => dispatch(setBoardHost(boardHost)),
    [dispatch],
  );

  return {
    board,
    getBoardListFn,
    setCreateBoardModalFn,
    setBoardMenuFn,
    setBoardHostFn,
  };
}

export default useBoard;
