import React, {
  ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import {
  Button, Header, Icon, Input, TextArea, TextAreaProps,
} from 'semantic-ui-react';
import { AppLayout, Item } from 'ui';
import useItem from 'hooks/useItem';
import ItemModel from 'model/ItemModel';
import { default as axiosInstance } from 'util/AxiosUtil';
import ContentEditable from 'react-contenteditable';
import { Constant } from '../config';

const axios = axiosInstance.instance;

function BoardPage() {
  const { item, getItemListFn } = useItem();

  const [content, setContent] = useState<string>('');

  const [file, setFile] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<any>('');

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

  useEffect(() => {
    getItemList().then((r) => {});
  }, []);

  // const handleContentArea = (e: FormEvent<HTMLDivElement>) => {
  //   console.log(e.currentTarget.textContent);
  //   setContent(e.currentTarget.textContent);
  // }

  const handleContentArea = (e: any) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const createItem = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    if (content === '') {
      alert('empty content');
      return;
    }

    console.log(content);
    console.log(file);

    const formData = new FormData();
    formData.append('boardKey', boardKey!);
    formData.append('content', content!.toString());
    formData.append('file', file);

    // file upload
    // await axios.post('/api/v1/item/file', formData).then((data) => {
    //   console.log(data);
    //
    //   if (data.data.status === true) {
    //     setContent('');
    //     getItemList().then((r) => {});
    //   }
    // });

    setPreviewUrl('');
    setContent('');

    // 기존 create item
    // await axios.post('/api/v1/item', payload).then((data) => {
    //   console.log(data);
    //
    //   if (data.data.status === true) {
    //     setContent('');
    //     getItemList().then((r) => {});
    //   }
    // });
  };

  // file upload
  const handleFileUpload = (e: any, data: object) => {
    e.preventDefault();
    console.log(e);

    const reader = new FileReader();
    const file = e.target.files[0];

    console.log(reader);
    console.log(file);

    reader.onload = () => {
      setFile(file);
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <AppLayout>
        <div className="board">
          <div className="leftBar">
            sidebar
          </div>
          <div className="middle content">
            <div>
              { /* 입력 박스 */ }
              <div className={ previewUrl ? 'createItem max' : 'createItem min' }>
                <div style={ { border: '1px solid black' } }>
                  <div>
                    {
                      previewUrl
                        ? (
                          <img src={ previewUrl } alt="alt" style={ { height: '150px' } } />
                        )
                        : ''
                    }
                  </div>
                  { /* <div */ }
                  { /*  contentEditable */ }
                  { /*  data-ph="오늘 무엇을 하셨나요?" */ }
                  { /*  className="editableDiv" */ }
                  { /*  onInput={ handleContentArea } */ }
                  { /* /> */ }
                  <ContentEditable
                    html={ content }
                    onChange={ handleContentArea }
                    disabled={ false }
                    className="editableDiv"
                    data-ph="오늘 무엇을 하셨나요?"
                    onSubmit={ () => false }
                  />
                </div>

                <div className="save">
                  { /* file upload */ }
                  <div className="fileBox">
                    { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                    <label htmlFor="ex_file">
                      <Icon name="plus" />
                    </label>
                    <Input
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={ handleFileUpload }
                      id="ex_file"
                    />
                    <Button onClick={ createItem }>저장</Button>
                  </div>
                  { /* file upload */ }
                </div>
              </div>
              { /* 리스트 */ }
              <div className="itemList">
                {
                item.itemList
                  ? item.itemList.map((itemList:ItemModel, index:number) => (
                    <Item
                      key={ itemList.itemKey }
                      item={ itemList }
                    />
                  ))
                  : ''
              }
              </div>
            </div>
          </div>
          <div className="rightBar">
            sidebar
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default BoardPage;
