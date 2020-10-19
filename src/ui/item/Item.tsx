import React from 'react';
import {
  Header, Icon, Comment, Dropdown,
} from 'semantic-ui-react';
import ItemModel from '../../model/ItemModel';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useItem from '../../hooks/useItem';

const axios = axiosInstance.instance;

type Props = {
  item: ItemModel;
};

function Item({ item }:Props) {
  const { getItemListFn } = useItem();

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
        // getItemListFn(data.data.object);
      }
    });
  };

  return (
    <>
      { /* <div className="item"> */ }
      { /*  <Header as="h3"> */ }
      { /*    Header */ }
      { /*    <Icon name="options" /> */ }
      { /*  </Header> */ }
      { /*  <div className=""> */ }
      { /*    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet */ }
      { /*  </div> */ }
      { /* </div> */ }

      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src="/images/non_user.png" />
          <Comment.Content>
            <Comment.Author>
              { item.creator }

              <Dropdown icon="options" className="option">
                <Dropdown.Menu>
                  <Dropdown.Item text="Delete" onClick={ deleteItem } />
                  { /* <Dropdown.Item text='E-mail Collaborators' /> */ }
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
              { item.content }
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default Item;
