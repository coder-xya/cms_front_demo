import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 针对AxiosRequestConfig配置进行扩展
export interface XYAInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

export interface XYARequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: XYAInterceptors<T>;
}
