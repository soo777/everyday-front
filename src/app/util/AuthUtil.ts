import { Constant } from '../config';

class AuthUtil {
  getUserId = () => {
    const userId = localStorage.getItem(Constant.USER_ID);
    return userId;
  }

  clearLocalStorage= () => {
    localStorage.clear();
  }
}

export default new AuthUtil();
