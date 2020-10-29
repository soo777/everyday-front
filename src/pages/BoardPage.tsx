import React, {
  ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState,
} from "react";
import {
  Button, Header, Icon, Input, TextArea, TextAreaProps,
} from 'semantic-ui-react';
import { AppLayout, Item } from 'ui';
import useItem from 'hooks/useItem';
import ItemModel from 'model/ItemModel';
import { default as axiosInstance } from 'util/AxiosUtil';
import { Constant } from '../config';

const axios = axiosInstance.instance;

function BoardPage() {
  const { item, getItemListFn } = useItem();

  const [content, setContent] = useState<string | number | undefined>('');

  const [file, setFile] = useState();
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

  // textarea
  // const handleContentArea = (e: SyntheticEvent, data: TextAreaProps) => {
  //   setContent(data.value);
  // };

  const handleContentArea = (e: FormEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.textContent);
    // setContent(data.value);
  };

  const createItem = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    console.log('create item');
    console.log(content);

    if (content === '') {
      alert('empty content');
      return;
    }

    const payload = {
      content,
      boardKey,
    };

    await axios.post('/api/v1/item', payload).then((data) => {
      console.log(data);

      if (data.data.status === true) {
        setContent('');
        getItemList().then((r) => {});
      }
    });
  };

  // file upload
  const handleFileUpload = (e: any, data: object) => {
    e.preventDefault();
    console.log(e);
    console.log(data);

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
              <div className="createItem">
                <div
                  contentEditable
                  data-ph="오늘 무엇을 하셨나요?"
                  className="editableDiv"
                  onInput={ handleContentArea }
                >
                  {
                    previewUrl
                      ? <img src={ previewUrl } alt="alt" />
                      : ''
                  }
                </div>

                {/*<TextArea*/}
                {/*  placeholder="오늘 무엇을 하셨나요?"*/}
                {/*  value={ content }*/}
                {/*  onChange={ handleContentArea }*/}
                {/*/>*/}

                { /* file upload */ }
                { /* { */ }
                { /*  previewUrl */ }
                { /*    ? <img src={ previewUrl } alt="alt" /> */ }
                { /*    : '' */ }
                { /* } */ }
                <div className="fileBox">
                  { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                  <label htmlFor="ex_file">upload</label>
                  <Input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={ handleFileUpload }
                    id="ex_file"
                  />
                </div>
                { /* file upload */ }

                <div className="save">
                  <Button onClick={ createItem }>저장</Button>
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
