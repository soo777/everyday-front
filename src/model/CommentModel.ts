class CommentModel {
  commentKey:string;

  itemKey:string;

  content:string;

  star:string;

  creator:string;

  createDate:string;

  updateDate:string;

  status:boolean;

  constructor() {
    this.commentKey = '';
    this.itemKey = '';
    this.content = '';
    this.star = '';
    this.creator = '';
    this.createDate = '';
    this.updateDate = '';
    this.status = false;
  }
}

export default CommentModel;
