import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

function LeftSideBar() {
  return (
    <>
      <div className="leftBar">
        <div className="menu"><Icon name="newspaper outline" />새 소식</div>
        <div className="menu"><Icon name="users" />멤버</div>
      </div>
    </>
  );
}

export default LeftSideBar;
