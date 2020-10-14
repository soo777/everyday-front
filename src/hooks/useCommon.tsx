import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'modules';
import { handleAlertModal, setAlertModal } from '../modules/common';

function useCommon() {
  const common = useSelector((state:RootState) => state.common);
  const dispatch = useDispatch();

  const handleAlertModalFn = useCallback(
    (bool:boolean) => dispatch(handleAlertModal(bool)),
    [dispatch],
  );

  const setAlertModalFn = useCallback(
    (header:string, content:string) => dispatch(setAlertModal(header, content)),
    [dispatch],
  );

  return {
    common,
    handleAlertModalFn,
    setAlertModalFn,
  };
}

export default useCommon;
