import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosHeaders,
} from 'axios';
import type { XYARequestConfig } from './type';

class XYARequest {
  instance: AxiosInstance;

  constructor(config: XYARequestConfig) {
    this.instance = axios.create(config);

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 确保 headers 存在
        config.headers = config.headers || new AxiosHeaders();
        // 可添加全局逻辑，如 token
        // config.headers.set('Authorization', 'Bearer token');
        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      },
    );

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data; // 直接返回数据
      },
      (err: any) => {
        return Promise.reject(err);
      },
    );

    // 实例特定的拦截器
    if (config.interceptors) {
      // 请求拦截器
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn as
          | ((
              value: InternalAxiosRequestConfig,
            ) =>
              | InternalAxiosRequestConfig
              | Promise<InternalAxiosRequestConfig>)
          | null,
        config.interceptors.requestFailureFn,
      );

      // 响应拦截器 - 处理类型转换
      this.instance.interceptors.response.use((res: AxiosResponse) => {
        // 如果实例有响应拦截器，传递响应数据
        if (config.interceptors?.responseSuccessFn) {
          return config.interceptors.responseSuccessFn(res.data);
        }
        return res.data;
      }, config.interceptors.responseFailureFn);
    }
  }

  // 封装网络请求的核心方法
  async request<T = any>(config: XYARequestConfig<T>): Promise<T> {
    // 单次请求的请求拦截器处理
    let finalConfig: InternalAxiosRequestConfig =
      config as unknown as InternalAxiosRequestConfig;

    if (config.interceptors?.requestSuccessFn) {
      finalConfig = await config.interceptors.requestSuccessFn(finalConfig);
    }

    try {
      // 发送请求
      const response = await this.instance.request<T>(finalConfig);

      // 处理响应数据
      let result: T = response as T;

      // 单次请求的响应拦截器处理
      if (config.interceptors?.responseSuccessFn) {
        result = await config.interceptors.responseSuccessFn(result);
      }

      return result;
    } catch (err) {
      // 单次请求的错误拦截器处理
      if (config.interceptors?.responseFailureFn) {
        throw config.interceptors.responseFailureFn(err);
      }
      throw err;
    }
  }

  // 简化方法
  get<T = any>(config: XYARequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: XYARequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: XYARequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: XYARequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default XYARequest;
