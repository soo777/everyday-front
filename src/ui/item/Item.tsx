import React from 'react';
import { Header, Icon, Comment } from 'semantic-ui-react';

function Item() {
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
              Stevie Feliciano
              <Icon name="options" className="option" />
            </Comment.Author>
            <Comment.Metadata>
              <div>2 days ago</div>
              <div>
                <Icon name="star" />5 Faves
              </div>
            </Comment.Metadata>
            <Comment.Text>
              Hey guys, I hope this example comment is helping you read this
              documentation.
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default Item;
