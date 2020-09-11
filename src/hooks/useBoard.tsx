import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { getBoardList } from '../modules/boardList';

function useBoard() {
  const boardList = useSelector((state:RootState) => state.boardList);
  const dispatch = useDispatch();

  const getAllBoardList = useCallback(
    (list:any) => dispatch(getBoardList(list)),
    [dispatch],
  );

  return {
    boardList,
    getAllBoardList,
  };
}

export default useBoard;
