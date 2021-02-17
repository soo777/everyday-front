import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Constant } from '../config';

class AxiosUtil {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();

    // request
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const jwtToken = localStorage.getItem(Constant.JWT_TOKEN);

      // console.log(jwtToken);

      if (jwtToken) {
        // header 에 token 세팅
        // eslint-disable-next-line no-param-reassign
        config.headers.common.Authorization = `Bearer ${jwtToken}`;
      }

      return config;
    });

    // response
    this.instance.interceptors.response.use(
      (response) => {
        console.log('axios success');
        return response;
      },
      (error) => {
        console.log('axios error');
        console.log(error.response.status);
        console.log(error.response.data.message);

        // 403 권한 에러 처리
        if (error.response.status === 403) {
          alert('wrong Authorization. please login.');
          window.location.href = '/';
        }

        // window.location.href = '/';
        return Promise.reject(error);
      },
    );
  }
}

export default new AxiosUtil();
