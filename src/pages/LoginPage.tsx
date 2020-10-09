import React, { useState } from 'react';
import {
  Button, Form, Header, Input,
} from 'semantic-ui-react';
import axios from 'axios';

function LoginPage() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleIdInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const idInput = e.target.value;
    setUserId(idInput);
  };

  const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const login = async () => {
    const payload = {
      username: userId,
      password,
    };

    await axios.post('/authenticate', payload).then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log('login success');
        localStorage.setItem('everyday_token', data.data.object);
      } else {
        console.log('login fail');
      }
    });
  };

  return (
    <>
      <div className="login">
        <Form>
          <div className="header">
            <Header as="h3">Login</Header>
          </div>
          <div className="login_input">
            <Input
              value={ userId }
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
        </Form>
      </div>
    </>
  );
}

export default LoginPage;
