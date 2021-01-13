import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useUser from '../../hooks/useUser';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';

const axios = axiosInstance.instance;

function AddMemberModal() {
  const { user, handleUserInfoModalFn } = useUser();

  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');

  const getUserDetail = async () => {
    const userId = localStorage.getItem(Constant.USER_ID);

    const payload = {
      params: {
        userId,
      },
    };

    await axios.get('/api/v1/user/userDetail', payload).then((data) => {
      console.log(data);
      if (data.status) {
        setUserId(data.data.object.userId);
        setName(data.data.object.name);
      }
    });
  };

  useEffect(() => {
    getUserDetail().then((r) => {});
  }, []);

  const closeModal = () => {
    handleUserInfoModalFn(false);
  };

  return (
    <>
      <Modal
        size="tiny"
        open={ user.userInfoModal }
        onClose={ closeModal }
      >
        <Modal.Header>My Info</Modal.Header>
        <Modal.Content>
          <Form>
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    ID
                  </Table.Cell>
                  <Table.Cell>
                    { userId }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Password
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      type="password"
                      // value={ password }
                      // onChange={ handlePassword }
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
                      // value={ passwordConfirm }
                      // onChange={ handlePasswordConfirm }
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
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ closeModal }>OK</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddMemberModal;
