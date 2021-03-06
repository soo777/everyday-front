import React, { useEffect, useState } from 'react';
import {
  Button, Form, Header, Input,
} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { Constant } from 'app/config';
import { default as axiosInstance } from 'app/util/AxiosUtil';
import jsonwebtoken from 'jsonwebtoken';
import useUser from 'app/hooks/useUser';
import { CreateUserModal } from 'app/ui/common';
import AuthUtil from '../util/AuthUtil';

const axios = axiosInstance.instance;

function LoginPage(routesProps: RouteComponentProps) {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { user, handleCreateUserModalFn } = useUser();

  useEffect(() => {
    AuthUtil.clearLocalStorage();
  }, []);

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

  const setJwtTokenLocalStorage = (jwtToken: any) => {
    let decoded = jsonwebtoken.decode(jwtToken);
    decoded = jsonwebtoken.decode(jwtToken, { complete: true });
    const parseJWT:any = decoded!;

    const { sub } = parseJWT.payload;

    localStorage.setItem(Constant.JWT_TOKEN, jwtToken);
    localStorage.setItem(Constant.USER_ID, sub);
    console.log(decoded);
  };

  const login = async () => {
    const payload = {
      username: userId,
      password,
    };

    await axios.post('/api/v1/authenticate', payload).then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log('login success');
        const jwtToken = data.data.object;

        setJwtTokenLocalStorage(jwtToken);

        routesProps.history.push('/boardList');
      } else {
        console.log('login fail');
      }
    });
  };

  return (
    <>
      <div className="login title">
        <h1>Allday</h1>
      </div>
      <div className="login">
        <Form>
          { /* <div className="header"> */ }
          { /*  <Header as="h3">Login</Header> */ }
          { /* </div> */ }
          <div className="login_input">
            <Input
              value={ userId }
              onChange={ handleIdInput }
              placeholder="id"
            />
          </div>
          <div className="login_input">
            <Input
              type="password"
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
