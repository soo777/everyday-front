import React, { ReactChild, ReactChildren } from "react";

interface Props {
  children: ReactChild | ReactChildren;
}

function AppLayout ({ children }: Props) {
  return (
    <>
      {/*applayout*/}
      {children}
    </>
  );
}

export default AppLayout;
