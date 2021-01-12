import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from 'app/modules';
import { handleCreateUserModal, handleUserInfoModal, getMemberList } from '../modules/user';

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

  const getMemberListFn = useCallback(
    (list:any) => dispatch(getMemberList(list)),
    [dispatch],
  );

  return {
    user,
    handleCreateUserModalFn,
    handleUserInfoModalFn,
    getMemberListFn,
  };
}

export default useUser;
