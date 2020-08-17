import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';

function useBoard() {
  const board = useSelector((state:RootState) => state.boardList);
  const dispatch = useDispatch();

  return {
    board,
  };
}

export default useBoard;
