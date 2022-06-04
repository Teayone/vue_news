import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义实例化 XRequest 时的拦截器接口
export interface XRequestConfigInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  responseInterceptors?: (res: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

// 继承 AxiosRequestConfig 的接口，并添加自定义接口
export interface XRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XRequestConfigInterceptors<T>;
}
