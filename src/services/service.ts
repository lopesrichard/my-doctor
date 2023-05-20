import axios, { RawAxiosRequestHeaders, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { storage } from '~/storage/auth';
import dayjs from 'dayjs';

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: string;
};

export type ErrorData = {
  message: string;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export abstract class Service {
  private axios: AxiosInstance;

  constructor(endpoint: string) {
    this.axios = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/${endpoint}` });
    intercept(this.axios);
  }

  protected async get<T>(url: string, params?: object) {
    return await this.request<T>({ method: 'GET', url, params });
  }

  protected async post<T>(url: string, data: object) {
    return await this.request<T>({ method: 'POST', url, data });
  }

  protected async put<T>(url: string, data: object) {
    return await this.request<T>({ method: 'PUT', url, data });
  }

  protected async delete(url: string) {
    return await this.request<void>({ method: 'DELETE', url });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<Response<T>> {
    const token = storage.read();

    const headers: Partial<RawAxiosRequestHeaders> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token.accessToken}`;
    }

    try {
      const response = await this.axios.request<T>({ ...config, headers: headers });
      return { success: true, data: response.data };
    } catch (e) {
      const error = e as AxiosError<ErrorData>;
      if (error.response?.status === 401 && location.pathname !== '/login') location.href = '/login';
      return { success: false, error: error.response?.data.message ?? 'Ocorreu um problema no servidor' };
    }
  }
}

export const intercept = (axios: AxiosInstance): void => {
  axios.interceptors.response.use(function (response) {
    parse(response.data);
    return response;
  });
};

const parse = (data: any | any[]) => {
  if (data === null || data === undefined) return;
  if (Array.isArray(data)) return data.forEach(parse);
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') return parse(value);
    if (typeof value === 'string') {
      const date = dayjs(value, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
      if (date.isValid()) return (data[key] = date);
      const time = dayjs(value, 'HH:mm:ss', true);
      if (time.isValid()) return (data[key] = time);
    }
  });
};
