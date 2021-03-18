import React from 'react';
import { Icon } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfoModal } from '../common';
import useUser from '../../hooks/useUser';

function Header(routesProps: RouteComponentProps) {
  const { user, handleUserInfoModalFn } = useUser();

  const openInfo = () => {
    handleUserInfoModalFn(true);
  };

  const goHome = () => {
    routesProps.history.push('/boardList');
  };

  const logout = () => {
    localStorage.clear();

    routesProps.history.push('/');
  };

  return (
    <>
      <div className="top header">
        <div className="center aligned">
          <span className="home">
            <Icon name="home" onClick={ goHome } />
          </span>
          Allday
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
