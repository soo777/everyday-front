import React, { SyntheticEvent, useState } from 'react';
import {
  Icon, Comment, Dropdown, TextArea, Button, TextAreaProps,
} from 'semantic-ui-react';
import ItemModel from '../../model/ItemModel';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useItem from '../../hooks/useItem';
import { Constant } from '../../config';
import CommentModel from '../../model/CommentModel';

const axios = axiosInstance.instance;

type Props = {
  item: ItemModel;
};

function Item({ item }:Props) {
  const { getItemListFn } = useItem();

  const [modifyBool, setModifyBool] = useState<boolean>(false);
  const [modifyText, setModifyText] = useState<string | number | undefined>(item.content);
  const [replyBool, setReplyBool] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string | number | undefined>('');

  const getItemList = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      params: {
        boardKey,
      },
    };

    await axios.get('/item', payload).then((data) => {
      console.log(data.data.object);
      getItemListFn(data.data.object);
    });
  };

  const deleteItem = async () => {
    console.log(item);

    const payload = {
      params: {
        itemKey: item.itemKey,
      },
    };

    await axios.delete('/item', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        getItemList().then((r) => {});
      }
    });
  };

  const handleModifyItem = () => {
    setModifyBool(true);
  };

  const cancelModifyItem = () => {
    setModifyBool(false);
  };

  const handleModifyInput = (e: SyntheticEvent, data: TextAreaProps) => {
    setModifyText(data.value);
  };

  const modifyItem = async () => {
    const payload = {
      itemKey: item.itemKey,
      content: modifyText,
    };

    await axios.put('/item', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        setModifyBool(false);
        getItemList().then((r) => {});
      }
    });
  };

  const handleReply = () => {
    setReplyBool(true);
  };

  const cancelReply = () => {
    setReplyBool(false);
  };

  const handleReplyInput = (e: SyntheticEvent, data: TextAreaProps) => {
    setReplyText(data.value);
  };

  const saveReply = async () => {
    const payload = {
      itemKey: item.itemKey,
      content: replyText,
      creator: 'soo',
    };

    await axios.post('/comment', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        setReplyBool(false);
        getItemList().then((r) => {});
      }
    });
  };

  return (
    <>
      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src="/images/non_user.png" />
          <Comment.Content>
            <Comment.Author>
              { item.creator }

              <Dropdown icon="options" className="option">
                <Dropdown.Menu>
                  <Dropdown.Item text="Modify" onClick={ handleModifyItem } />
                  <Dropdown.Item text="Delete" onClick={ deleteItem } />
                </Dropdown.Menu>
              </Dropdown>

            </Comment.Author>
            <Comment.Metadata>
              <div>{ item.createDate }</div>
              <div>
                <Icon name="star" />
                { item.star }
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {
                modifyBool
                  ? (
                    <>
                      <TextArea
                        className="modify_textarea"
                        value={ modifyText }
                        onChange={ handleModifyInput }
                      />
                      <Button onClick={ modifyItem }>modify</Button>
                      <Button onClick={ cancelModifyItem }>cancel</Button>
                    </>
                  )
                  : (
                    item.content
                  )
              }
            </Comment.Text>

            { /* comment */ }
            {
              item.comment.length
                ? (
                  item.comment.map((commentList:CommentModel, index:number) => (
                    <Comment.Group>
                      { commentList.content }
                    </Comment.Group>
                  ))
                ) : ''
            }
            { /* comment */ }

            { /*  reply */ }
            {
              replyBool
                ? (
                  <Comment.Group>
                    <div>
                      <TextArea
                        className="reply_textarea"
                        value={ replyText }
                        onChange={ handleReplyInput }
                      />
                    </div>
                    <div>
                      <Button onClick={ saveReply }>save</Button>
                      <Button onClick={ cancelReply }>cancel</Button>
                    </div>
                  </Comment.Group>
                )
                : (
                  <Comment.Content>
                    <span onClick={ handleReply }>reply</span>
                  </Comment.Content>
                )
            }
            { /*  reply */ }

          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default Item;
