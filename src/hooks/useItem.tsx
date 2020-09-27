import { useSelector } from 'react-redux';
import { RootState } from '../modules';

function useItem() {
  const item = useSelector((state:RootState) => state.item);

  return {
    item,
  };
}

export default useItem;
