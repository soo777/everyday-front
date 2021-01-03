import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Icon, Comment, Dropdown, TextArea, Button, TextAreaProps, Modal, Image, Input,
} from 'semantic-ui-react';
import qs from 'qs';
import ItemModel from '../../model/ItemModel';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useItem from '../../hooks/useItem';
import { Constant } from '../../config';
import CommentModel from '../../model/CommentModel';

const axios = axiosInstance.instance;

type Props = {
  item: ItemModel;
};

function Item({ item }: Props) {
  const { getItemListFn } = useItem();

  const [modifyBool, setModifyBool] = useState<boolean>(false);
  const [modifyText, setModifyText] = useState<string | number | undefined>(item.content);
  const [replyBool, setReplyBool] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string | number | undefined>('');
  const [img, setImg] = useState<any>([]);
  const [tempImg, setTempImg] = useState<any>([]);
  const [imgModal, setImgModal] = useState<boolean>(false);
  const [imgModalPreview, setImgModalPreview] = useState<any>();

  const getFileImage = async () => {
    console.log(item.files);

    const filePathArr: string[] = [];

    item.files.forEach((file: any) => {
      filePathArr.push(file.path);
    });

    // console.log(filePathArr);

    // file base 가져오는 api
    const payload = {
      params: {
        filePath: filePathArr,
      },
      paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    await axios.get('/api/v1/item/file', payload).then((data) => {
      console.log(data.data.object);

      const { img } = data.data.object;
      setImg(img);

      const tempImg = img.filter((data:any, index:number) => index < 3);
      setTempImg(tempImg);
      console.log(tempImg);

      // modal image setting
      setImgModalPreview(img[0]);

      // console.log(img);
    });
  };

  useEffect(() => {
    if (item.files.length > 0) {
      getFileImage().then();
    }
  }, []);

  /** item * */
  const getItemList = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      params: {
        boardKey,
      },
    };

    await axios.get('/api/v1/item', payload).then((data) => {
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

    await axios.delete('/api/v1/item', payload).then((data) => {
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
  /** item * */

  /** item modify * */
  const handleModifyInput = (e: SyntheticEvent, data: TextAreaProps) => {
    setModifyText(data.value);
  };

  const modifyItem = async () => {
    const payload = {
      itemKey: item.itemKey,
      content: modifyText,
    };

    await axios.put('/api/v1/item', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        setModifyBool(false);
        getItemList().then((r) => {});
      }
    });
  };
  /** item modify * */

  /** item reply * */
  const handleReply = () => {
    setReplyBool(true);
  };

  const cancelReply = () => {
    setReplyBool(false);
  };

  const handleReplyInput = (e: SyntheticEvent, data: TextAreaProps) => {
    setReplyText(data.value);
  };

  const handleReplyInput2 = (e:React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const saveReply = async () => {
    const payload = {
      itemKey: item.itemKey,
      content: replyText,
      creator: 'soo',
    };

    await axios.post('/api/v1/comment', payload).then((data) => {
      console.log(data);
      if (data.data.status) {
        setReplyBool(false);
        setReplyText('');
        getItemList().then((r) => {});
      }
    });
  };

  const submitReply = (e:any) => {
    if (e.key === 'Enter') {
      saveReply();
    }
  };
  /** item reply * */

  /** image modal * */
  const setImageModal = (bool:boolean) => {
    setImgModal(bool);
  };
  /** image modal * */

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
                    // item.content
                    <div className="imgDiv">
                      {
                        tempImg ? (
                          tempImg.map((img: string, index:number, arr:any) => (
                            // <div className={ arr.length - 1 !== index ? 'fileImage float_left' : 'fileImage' }>
                            <div
                              className={ arr.length - 1 !== index ? 'fileImage float_left' : 'fileImage float_left' }
                              onClick={ () => { setImageModal(true); } }
                            >
                              <img className="imgPreview" src={ img } alt="image1" />
                            </div>
                          ))
                        )
                          : ''
                      }
                      <div className="moreImg">
                        <div>
                          <span onClick={ () => { setImageModal(true); } }>
                            {
                              tempImg.length > 0 ? <Icon name="plus" className="plus" /> : null
                            }
                          </span>
                          { /* <br /> */ }
                          { /* <span className="more">more</span> */ }
                        </div>
                      </div>
                      <div>
                        { item.content }
                      </div>
                    </div>
                  )

              }
            </Comment.Text>

            { /* comment */ }
            {
              item.comment.length
                ? (
                  item.comment.map((commentList: CommentModel, index: number) => (
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
                    <span onClick={ handleReply }>reply comment</span>
                    { /* reply comment */ }
                    <Input
                      className="comment"
                      placeholder="reply comment"
                      value={ replyText }
                      onChange={ handleReplyInput2 }
                      onKeyPress={ submitReply }
                    />
                  </Comment.Content>
                )
            }
            { /*  reply */ }

          </Comment.Content>
        </Comment>
      </Comment.Group>

      { /* image modal */ }
      <Modal
        onClose={ () => setImageModal(false) }
        onOpen={ () => setImageModal(true) }
        open={ imgModal }
        size="small"
        className="imageModal"
      >
        <Modal.Header>Images</Modal.Header>
        <Modal.Content image>
          <span><Icon name="arrow left" /></span>
          { /* <Image src={ img[1] } size="large" centered /> */ }
          <Image src={ imgModalPreview } size="large" centered />
          <span><Icon name="arrow right" /></span>
        </Modal.Content>
        <Modal.Content>
          {
            img.map((img: string, index:number, arr:any) => (
              <div
                style={ { float: 'left' } }
                // onClick={ () => { setImageModal(true); } }
              >
                <img
                  className="imgList"
                  src={ img }
                  alt="image1"
                  style={ { width: '150px', height: '100px', padding: '5px' } }
                  onClick={ () => { setImgModalPreview(img); } }
                />
              </div>
            ))
          }
        </Modal.Content>
        <Modal.Actions style={ { clear: 'both' } }>
          <Button onClick={ () => setImageModal(false) } positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
      { /* image modal */ }
    </>
  );
}

export default Item;
