import React from 'react';
import { Button, Input } from 'semantic-ui-react';

function LoginPage() {
  return (
    <>
      <div>
        <div>
          Login
        </div>
        <div>
          Id
          <Input />
        </div>
        <div>
          Password
          <Input />
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
