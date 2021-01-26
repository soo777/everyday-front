import { Message } from "../config";

class CommonUtil {
  checkPasswordValidation = (password:string | undefined) => {
    if (password === undefined) {
      return { message: '', strBoolean: '' };
    }

    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/ig);
    const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    const result = { message: '', strBoolean: 'true' };

    if (password.length < 6 || password.length > 15) {
      // Please enter within 6 ~ 15 digits.
      result.message = Message.COMMON.VALIDATION.PASSWORD_TYPE_ERROR001;
      result.strBoolean = 'false';
    } if (password.search(/\s/) !== -1) {
      // Please enter your password without spaces.
      result.message = Message.COMMON.VALIDATION.PASSWORD_TYPE_ERROR002;
      result.strBoolean = 'false';
    } if ((num < 0 && eng < 0) || (num < 0 && spe < 0) || (eng < 0 && spe < 0)) {
      // Please enter a mixture of English letters, numbers, and special characters.
      result.message = Message.COMMON.VALIDATION.PASSWORD_TYPE_ERROR003;
      result.strBoolean = 'false';
    }

    return result;
  }
}

export default new CommonUtil();
