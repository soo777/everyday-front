import React, { useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useUser from 'app/hooks/useUser';
import { Message } from 'app/config';
import useCommon from 'app/hooks/useCommon';
import { AlertModal } from './index';
import { default as axiosInstance } from '../../util/AxiosUtil';

const axios = axiosInstance.instance;

function CreateUserModal() {
  const { user, handleCreateUserModalFn } = useUser();
  const { common, handleAlertModalFn, setAlertModalFn } = useCommon();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = e.target.value;
    setUserId(userId);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const signIn = async () => {
    // handleCreateUserModalFn(false);
    console.log(`${userId} ${password} ${passwordConfirm} ${name}`);

    if (password !== passwordConfirm) {
      console.log('check password');

      setAlertModalFn(Message.alert, Message.password_fail);
      handleAlertModalFn(true);

      return;
    }

    // api call
    const payload = {
      userId,
      password,
      name,
    };

    await axios.post('/api/v1/signIn', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        setAlertModalFn(Message.alert, Message.signIn_success);
        handleAlertModalFn(true);
        handleCreateUserModalFn(false);
      } else {
        setAlertModalFn(Message.alert, Message.userId_fail);
        handleAlertModalFn(true);
      }
    });
  };

  const closeModal = () => {
    handleCreateUserModalFn(false);
  };

  return (
    <>
      <Modal
        onClose={ () => handleCreateUserModalFn(false) }
        onOpen={ () => handleCreateUserModalFn(false) }
        open={ user.createUserModal }
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
                    <Input
                      value={ userId }
                      onChange={ handleUserId }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Password
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      type="password"
                      value={ password }
                      onChange={ handlePassword }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Password Confirm
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      type="password"
                      value={ passwordConfirm }
                      onChange={ handlePasswordConfirm }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Name
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      value={ name }
                      onChange={ handleName }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Sign In"
            color="green"
            onClick={ signIn }
          />
          <Button
            content="cancel"
            color="black"
            onClick={ closeModal }
          />
        </Modal.Actions>
      </Modal>

      <AlertModal />
    </>
  );
}

export default CreateUserModal;
