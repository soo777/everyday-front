import React, { useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useCommon from '../../hooks/useCommon';
import useUser from '../../hooks/useUser';

function UserInfoModal() {
  const { user, handleUserInfoModalFn } = useUser();
  const { common, handleAlertModalFn } = useCommon();

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
                    ididid
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
                      // value={ name }
                      // onChange={ handleName }
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

export default UserInfoModal;
