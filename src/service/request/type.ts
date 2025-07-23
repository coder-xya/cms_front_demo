import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export interface XYAInterceptors<T = any> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

  requestFailureFn?: (err: any) => any;

  responseSuccessFn?: (res: T) => T | Promise<T>;

  responseFailureFn?: (err: any) => any;
}

export interface XYARequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: XYAInterceptors<T>;
}
