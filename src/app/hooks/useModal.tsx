import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'app/modules';
import { setAddMemberModal } from 'app/modules/modal';

function useModal() {
  const modal = useSelector((state:RootState) => state.modal);
  const dispatch = useDispatch();

  const setAddMemberModalFn = useCallback(
    (bool:boolean) => dispatch(setAddMemberModal(bool)),
    [dispatch],
  );

  return {
    modal,
    setAddMemberModalFn,
  };
}

export default useModal;
