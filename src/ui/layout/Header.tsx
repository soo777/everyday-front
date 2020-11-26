import React from 'react';
import { Icon } from 'semantic-ui-react';
import { UserInfoModal } from '../common';
import useUser from '../../hooks/useUser';

function Header() {
  const { handleUserInfoModalFn } = useUser();

  const openInfo = () => {
    handleUserInfoModalFn(true);
  };

  return (
    <>
      <div className="top header">
        <div className="center aligned">
          everyday
          <span className="user">
            <Icon name="user" onClick={ openInfo } />
          </span>
        </div>
      </div>

      <UserInfoModal />
    </>
  );
}

export default Header;
