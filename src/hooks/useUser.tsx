import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'modules';
import { handleCreateUserModal } from '../modules/user';

function useUser() {
  const user = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch();

  const handleCreateUserModalFn = useCallback(
    (bool:boolean) => dispatch(handleCreateUserModal(bool)),
    [dispatch],
  );

  return {
    user,
    handleCreateUserModalFn,
  };
}

export default useUser;
