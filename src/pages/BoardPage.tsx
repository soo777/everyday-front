import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Header, Icon, TextArea, TextAreaProps,
} from 'semantic-ui-react';
import axios from 'axios';
import { Item } from '../ui';
import useItem from '../hooks/useItem';
import ItemModel from '../model/ItemModel';

function BoardPage() {
  const { item, getItemListFn } = useItem();

  const [content, setContent] = useState<string | number | undefined>('');

  const getItemList = async () => {
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
    </>
  );
}

export default BoardPage;
