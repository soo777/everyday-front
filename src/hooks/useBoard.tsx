import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { getBoardList } from '../modules/boardList';

function useBoard() {
  const boardList = useSelector((state:RootState) => state.boardList);
  const dispatch = useDispatch();

  const getBoardList1 = useCallback(
    (list:any) => dispatch(getBoardList(list)),
    [dispatch],
  );

  return {
    boardList,
    getBoardList1,
  };
}

export default useBoard;
