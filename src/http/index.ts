import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import nprogress from "nprogress";
import { message } from "ant-design-vue";

//创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

//相应拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    nprogress.start();
    const token = localStorage.getItem("token");
    return config;
  },
  (err: AxiosError) => {
    nprogress.done();
    console.log(err);
    return Promise.reject(err);
  }
);

//相应拦截
service.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    nprogress.done();
    return res.data;
  },
  (err: AxiosError) => {
    nprogress.done();
    if (err.response && err.response.status) {
      const status = err.response.status;
      if (status === 400) {
        message.error(err.response.data.message);
        // console.log("参数错误", err);
      }
      if (status === 401) {
        message.error(err.response.data.message);
        // console.log("登录过期，请重新登录", err);
      }
      if (status === 403) {
        message.error(err.response.data.message);
        // console.log("没有权限", err);
      }
      if (status === 404) {
        message.error(err.response.data.message);
        // console.log("接口路径错误", err);
      }
      if (status === 500) {
        message.error(err.response.data.message);
        // console.log("服务器出错", err);
      }
      if (status === 503) {
        message.error(err.response.data.message);
        // console.log("服务器在维护", err);
      }
    }
    return Promise.reject(err); //处理错误的写法
  }
);
export default service;
