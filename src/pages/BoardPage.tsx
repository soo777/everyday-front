import React, { useEffect } from 'react';
import {
  Button, Header, Icon, TextArea,
} from 'semantic-ui-react';
import axios from 'axios';
import { Item } from '../ui';
import useItem from '../hooks/useItem';
import ItemModel from '../model/ItemModel';

function BoardPage() {
  const { item, getItemListFn } = useItem();

  const getItemList = async () => {
    await axios.get('/item').then((data) => {
      console.log(data.data.object);
      getItemListFn(data.data.object);
    });
  };

  useEffect(() => {
    getItemList().then((r) => {});
  }, []);

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
              />
              <div className="save">
                <Button>저장</Button>
              </div>
            </div>
            { /* 리스트 */ }
            <div className="itemList">
              {
                console.log(item)
              }
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
