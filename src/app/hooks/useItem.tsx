import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'app/modules';
import { getItemList } from 'app/modules/item';

function useItem() {
  const item = useSelector((state:RootState) => state.item);
  const dispatch = useDispatch();

  const getItemListFn = useCallback(
    (list:any) => dispatch(getItemList(list)),
    [dispatch],
  );

  return {
    item,
    getItemListFn,
  };
}

export default useItem;
