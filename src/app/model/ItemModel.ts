class ItemModel {
  itemKey:string;

  boardKey:string;

  content:string;

  star:string;

  creator:string;

  createDate:string;

  updateDate:string;

  comment:any;

  files:any

  constructor() {
    this.itemKey = '';
    this.boardKey = '';
    this.content = '';
    this.star = '';
    this.creator = '';
    this.createDate = '';
    this.updateDate = '';
    this.comment = [];
    this.files = [];
  }
}

export default ItemModel;
