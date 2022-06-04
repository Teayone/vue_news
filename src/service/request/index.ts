import axios from "axios";
import type { AxiosInstance } from "axios";
import type { XRequestConfig, XRequestConfigInterceptors } from "./type";
import { Notify } from "vant";
export default class XRequest {
  instance: AxiosInstance;
  interceptors?: XRequestConfigInterceptors;
  constructor(config: XRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    // 定义全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        Notify({
          type: "danger",
          message: "网络状态不佳，请刷新重试",
        });
        return error;
      }
    );

    // 定义实例化时的拦截器,new 的时候会将下面的函数传过来
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    );
  }
  request<T = any>(config: XRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 判断单独的请求是否写了拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      // 2. 发起请求
      this.instance.request<any, T>(config).then(
        // 3. 得到结果判断是否写了响应拦截
        (res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors?.responseInterceptors(res);
          }
          resolve(res);
        },
        (err) => {
          reject(err);
          return err;
        }
      );
    });
  }
  get<T = any>(config: XRequestConfig<T>) {
    return this.request<T>({ method: "GET", ...config });
  }
  post<T = any>(config: XRequestConfig<T>) {
    return this.request<T>({ method: "POST", ...config });
  }
}
