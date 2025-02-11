import {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
  connectionAPIPut,
} from './connectionAPI'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useGlobalStore } from '@/stores/globalStore'
import type { AlertType } from '@/utils/types/alert.type'

export default function useRequest() {
  const globalStore = useGlobalStore()

  const getRequest = async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T> | undefined> => {
    globalStore.loading = true

    const returnData = await connectionAPIGet<T>(url, config)
      .then((result) => {
        return result
      })
      .catch((error) => {
        Object.assign(globalStore.alert, {
          isActive: true,
          text: error.message.toString(),
          type: 'error',
        })

        setTimeout(() => {
          Object.assign(globalStore.alert, {
            isActive: false,
            text: '',
            type: undefined as AlertType,
          })
        }, 3000)

        return undefined
      })

    globalStore.loading = false
    return returnData
  }

  const postRequest = async <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T> | undefined> => {
    globalStore.loading = true

    const returnData = await connectionAPIPost<T>(url, body, config)
      .then((result) => {
        return result
      })
      .catch((error) => {
        Object.assign(globalStore.alert, {
          isActive: true,
          text: error.message.toString(),
          type: 'error',
        })

        setTimeout(() => {
          Object.assign(globalStore.alert, {
            isActive: false,
            text: '',
            type: undefined as AlertType,
          })
        }, 3000)

        return undefined
      })

    globalStore.loading = false
    return returnData
  }

  const patchRequest = async <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T> | undefined> => {
    globalStore.loading = true

    const returnData = await connectionAPIPatch<T>(url, body, config)
      .then((result) => {
        return result
      })
      .catch((error) => {
        Object.assign(globalStore.alert, {
          isActive: true,
          text: error.message.toString(),
          type: 'error',
        })

        setTimeout(() => {
          Object.assign(globalStore.alert, {
            isActive: false,
            text: '',
            type: undefined as AlertType,
          })
        }, 3000)

        return undefined
      })

    globalStore.loading = false
    return returnData
  }

  const putRequest = async <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T> | undefined> => {
    globalStore.loading = true

    const returnData = await connectionAPIPut<T>(url, body, config)
      .then((result) => {
        return result
      })
      .catch((error) => {
        Object.assign(globalStore.alert, {
          isActive: true,
          text: error.message.toString(),
          type: 'error',
        })

        setTimeout(() => {
          Object.assign(globalStore.alert, {
            isActive: false,
            text: '',
            type: undefined as AlertType,
          })
        }, 3000)

        return undefined
      })

    globalStore.loading = false
    return returnData
  }

  const deleteRequest = async <T>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T> | undefined> => {
    globalStore.loading = true

    const returnData = await connectionAPIDelete<T>(url, config)
      .then((result) => {
        return result
      })
      .catch((error) => {
        Object.assign(globalStore.alert, {
          isActive: true,
          text: error.message.toString(),
          type: 'error',
        })

        setTimeout(() => {
          Object.assign(globalStore.alert, {
            isActive: false,
            text: '',
            type: undefined as AlertType,
          })
        }, 3000)

        return undefined
      })

    globalStore.loading = false
    return returnData
  }

  return {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    deleteRequest,
  }
}
