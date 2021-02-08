import { Constant } from '../config';

class AuthUtil {
  getUserId = () => {
    const userId = localStorage.getItem(Constant.USER_ID);
    return userId;
  }
}

export default new AuthUtil();
