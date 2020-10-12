import React, { useState } from 'react';
import {
  Button, Form, Header, Input, Modal, Image, Table,
} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { Constant } from 'config';
import { default as axiosInstance } from 'util/AxiosUtil';

const axios = axiosInstance.instance;

function LoginPage(routesProps: RouteComponentProps) {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modalOpen, setModal] = useState<boolean>(true);

  const handleIdInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const idInput = e.target.value;
    setUserId(idInput);
  };

  const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const signIn = () => {
    setModal(true);
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

      <Modal
        onClose={ () => setModal(false) }
        onOpen={ () => setModal(true) }
        open={ modalOpen }
        size="tiny"
      >
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Content>
          <Form>
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    ID
                  </Table.Cell>
                  <Table.Cell>
                    <Input />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Password
                  </Table.Cell>
                  <Table.Cell>
                    <Input type="password" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Password 확인
                  </Table.Cell>
                  <Table.Cell>
                    <Input  type="password" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    이름
                  </Table.Cell>
                  <Table.Cell>
                    <Input />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Sign In"
            labelPosition="right"
            icon="checkmark"
            onClick={ () => setModal(false) }
            positive
          />
          <Button
            content="cancel"
            color="black"
            onClick={ () => setModal(false) }
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default LoginPage;
