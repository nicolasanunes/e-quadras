import {
  ERROR_ACCESS_DENIED,
  ERROR_CONFLICT,
  ERROR_INVALID_DATA,
  ERROR_NETWORK,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  ERROR_SERVICE_UNAVAILABLE,
  ERROR_TOO_MANY_REQUESTS,
  ERROR_UNAUTHORIZED,
  ERROR_UNKNOWN,
} from '@/utils/constants/errorStatus'
import { MethodEnum } from '@/utils/enums/method.enum'
import type { MethodType } from '@/utils/types/method.type'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export const connectionAPIGet = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return ConnectionAPI.connect(url, MethodEnum.GET, config)
}

export const connectionAPIPost = async <T>(
  url: string,
  body: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return ConnectionAPI.connect(url, MethodEnum.POST, config, body)
}

export const connectionAPIPatch = async <T>(
  url: string,
  body: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return ConnectionAPI.connect(url, MethodEnum.PATCH, config, body)
}

export const connectionAPIPut = async <T>(
  url: string,
  body: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return ConnectionAPI.connect(url, MethodEnum.PUT, config, body)
}

export const connectionAPIDelete = async <T>(
  url: string,
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return ConnectionAPI.connect(url, MethodEnum.DELETE, config)
}

export default class ConnectionAPI {
  static async call<T>(
    url: string,
    method: MethodType,
    config?: AxiosRequestConfig,
    body?: unknown,
  ): Promise<AxiosResponse<T>> {
    switch (method) {
      case MethodEnum.POST:
      case MethodEnum.PUT:
      case MethodEnum.PATCH:
        return await axios[method]<T>(url, body, config)
      case MethodEnum.GET:
      case MethodEnum.DELETE:
      default:
        return await axios[method]<T>(url, config)
    }
  }

  static async connect<T>(
    url: string,
    method: MethodType,
    config?: AxiosRequestConfig,
    body?: unknown,
  ): Promise<AxiosResponse<T>> {
    return ConnectionAPI.call<T>(url, method, config, body).catch(async (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error(ERROR_INVALID_DATA)
          case 401:
            throw new Error(ERROR_UNAUTHORIZED)
          case 403:
            throw new Error(ERROR_ACCESS_DENIED)
          case 404:
            throw new Error(ERROR_NOT_FOUND)
          case 409:
            throw new Error(ERROR_CONFLICT)
          case 429:
            throw new Error(ERROR_TOO_MANY_REQUESTS)
          case 500:
            throw new Error(ERROR_SERVER)
          case 503:
            throw new Error(ERROR_SERVICE_UNAVAILABLE)
          default:
            throw new Error(ERROR_NETWORK)
        }
      }
      throw new Error(ERROR_UNKNOWN)
    })
  }
}
