import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';

function useBoard() {
  const boardList = useSelector((state:RootState) => state.boardList);
  const dispatch = useDispatch();

  return {
    boardList,
  };
}

export default useBoard;
