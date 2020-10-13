import React, { useState } from 'react';
import {
  Button, Form, Header, Input,
} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { Constant } from 'config';
import { default as axiosInstance } from 'util/AxiosUtil';
import useUser from 'hooks/useUser';
import { CreateUserModal } from 'ui/common';

const axios = axiosInstance.instance;

function LoginPage(routesProps: RouteComponentProps) {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { user, handleCreateUserModalFn } = useUser();

  const handleIdInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const idInput = e.target.value;
    setUserId(idInput);
  };

  const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const signIn = () => {
    handleCreateUserModalFn(true);
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
        localStorage.setItem(Constant.JWT_TOKEN, data.data.object);

        routesProps.history.push('/board');
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
          <div className="sign_div">
            <span
              className="signIn"
              onClick={ signIn }
            >
              sign in
            </span>
          </div>
        </Form>
      </div>
      <CreateUserModal />
    </>
  );
}

export default LoginPage;
