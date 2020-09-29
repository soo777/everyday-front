class ItemModel {
  itemId:string;

  boardId:string;

  content:string;

  star:string;

  creator:string;

  createDate:string;

  updateDate:string;

  constructor() {
    this.itemId = '';
    this.boardId = '';
    this.content = '';
    this.star = '';
    this.creator = '';
    this.createDate = '';
    this.updateDate = '';
  }
}

export default ItemModel;
