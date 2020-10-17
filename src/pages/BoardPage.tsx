import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Header, Icon, TextArea, TextAreaProps,
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

  const getItemList = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      boardKey,
    };

    await axios.get('/item').then((data) => {
      console.log(data.data.object);
      getItemListFn(data.data.object);
    });
  };

  useEffect(() => {
    getItemList().then((r) => {});
  }, []);

  const handleContentArea = (e: SyntheticEvent, data: TextAreaProps) => {
    setContent(data.value);
  };

  const createItem = async () => {
    console.log('create item');
    console.log(content);

    const payload = {
      content,
    };

    await axios.post('/item', payload).then((data) => {
      console.log(data);

      if (data.data.status === true) {
        setContent('');
        getItemList().then((r) => {});
      }
    });
  };

  return (
    <>
      <AppLayout>
        <div className="board">
          <div className="nav">
            sidebar
          </div>
          <div className="middle content">
            <div>
              { /* 입력 박스 */ }
              <div className="createItem">
                <TextArea
                  placeholder="오늘 무엇을 하셨나요?"
                  value={ content }
                  onChange={ handleContentArea }
                />
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
                      item={ itemList }
                    />
                  ))
                  : ''
              }
              </div>
            </div>
          </div>
          <div className="sideBar">
            sidebar
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default BoardPage;
