import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'modules';
import { handleCreateUserModal, handleUserInfoModal } from '../modules/user';

function useUser() {
  const user = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch();

  const handleCreateUserModalFn = useCallback(
    (bool:boolean) => dispatch(handleCreateUserModal(bool)),
    [dispatch],
  );

  const handleUserInfoModalFn = useCallback(
    (bool:boolean) => dispatch(handleUserInfoModal(bool)),
    [dispatch],
  );

  return {
    user,
    handleCreateUserModalFn,
    handleUserInfoModalFn,
  };
}

export default useUser;
