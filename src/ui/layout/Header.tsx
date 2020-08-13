import React from 'react';
import { Icon } from 'semantic-ui-react';

function Header() {
  return (
    <>
      <div className="header">
        <div className="center aligned">
          everyday
          <span className="user">
            <Icon name="user" />
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
