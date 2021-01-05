import React, { useEffect, useState } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable';
import ItemModel from '../../model/ItemModel';
import { Item } from '../item';
import useItem from '../../hooks/useItem';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';

const axios = axiosInstance.instance;

function Board() {
  const { item, getItemListFn } = useItem();

  const [content, setContent] = useState<string>('');

  // const [file, setFile] = useState<any>();
  // const [previewUrl, setPreviewUrl] = useState<any>('');
  const [file, setFile] = useState<any>([]);
  const [previewUrl, setPreviewUrl] = useState<any>([]);

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
    console.log(previewUrl);

    const formData = new FormData();
    formData.append('boardKey', boardKey!);
    formData.append('content', content!.toString());

    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }

    // formData.append('file', file);

    // file upload
    await axios.post('/api/v1/item/file', formData).then((data) => {
      console.log(data);

      if (data.data.status === true) {
        setContent('');
        setPreviewUrl('');
        setContent('');

        getItemList().then((r) => {});
      }
    });

    // setPreviewUrl('');
    // setContent('');

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

    const fileArr = e.target.files;
    console.log(fileArr);

    // const reader = new FileReader();
    // const newFile = e.target.files[0];
    //
    // console.log(reader);
    // console.log(newFile);
    //
    // reader.onload = () => {
    //   setFile(fileArr);
    //   setPreviewUrl(reader.result);
    // };
    // reader.readAsDataURL(newFile);

    // for (let i = 0; i < fileArr.length; i++) {
    //   const reader = new FileReader();
    //   const newFile = fileArr[i];
    //
    //   const a = file;
    //   // console.log(a);
    //   a.push(fileArr[i]);
    //
    //   const b = previewUrl;
    //   console.log(b);
    //
    //   reader.onload = () => {
    //     const c = b.concat(reader.result);
    //     // console.log(b);
    //
    //     setFile(a);
    //     // setPreviewUrl(previewUrl.concat(reader.result));
    //     setPreviewUrl(c);
    //     console.log(previewUrl);
    //   };
    //   reader.readAsDataURL(newFile);
    // }

    const files = Array.from(e.target.files);

    Promise.all(files.map((file:any) => (new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', (ev) => {
        resolve(ev.target!.result);
      });
      reader.addEventListener('error', reject);
      reader.readAsDataURL(file);
    })))).then((images:any) => {
      /* Once all promises are resolved, update state with image URI array */
      setPreviewUrl(images);
      // this.setState({ imageArray : images })
    }, (error) => {
      console.error(error);
    });

    setFile(files);

    console.log(file);
    console.log(previewUrl);
  };

  return (
    <>
      <div className="middle content">
        <div>
          { /* 입력 박스 */ }
          <div className={ previewUrl.length > 0 ? 'createItem max' : 'createItem min' }>
            <div className="editBox">
              <div>
                {
                  previewUrl.length > 0
                    ? (
                      previewUrl.map((data:any) => (
                        // <>asdf</>
                        <img src={ data } alt="alt" style={ { height: '150px' } } />
                      ))
                      // <img src={ previewUrl } alt="alt" style={ { height: '150px' } } />
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
                  { /* <Icon name="plus" /> */ }
                  <Icon name="image" />
                </label>
                <Input
                  type="file"
                  multiple
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={ handleFileUpload }
                  id="ex_file"
                />
              </div>
              { /* file upload */ }
              <div>
                <Button onClick={ createItem }>저장</Button>
              </div>
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
    </>
  );
}

export default Board;
