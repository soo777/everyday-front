import React, { useState } from 'react';
import { Button, Header, Input } from 'semantic-ui-react';

function LoginPage() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleIdInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const idInput = e.target.value;
    setId(idInput);
  };

  const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const login = () => {
    console.log(id, password);
  };

  return (
    <>
      <div className="login">
        <div className="header">
          <Header as="h3">Login</Header>
        </div>
        <div className="login_input">
          <Input
            value={ id }
            onChange={ handleIdInput }
            placeholder="id"
          />
        </div>
        <div className="login_input">
          <Input
            value={ password }
            onChange={ handlePasswordInput }
            placeholder="password"
          />
        </div>
        <div className="login_btn">
          <Button
            onClick={ login }
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
