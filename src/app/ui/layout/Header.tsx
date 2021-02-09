import React from 'react';
import { Icon } from 'semantic-ui-react';
import { UserInfoModal } from '../common';
import useUser from '../../hooks/useUser';

function Header() {
  const { user, handleUserInfoModalFn } = useUser();

  const openInfo = () => {
    handleUserInfoModalFn(true);
  };

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  return (
    <>
      <div className="top header">
        <div className="center aligned">
          everyday
          <span className="user">
            <Icon name="log out" onClick={ logout } />
          </span>
          <span className="user pd_right5">
            <Icon name="user" onClick={ openInfo } />
          </span>
        </div>
      </div>
      { user.userInfoModal ? <UserInfoModal /> : null }
    </>
  );
}

export default Header;
