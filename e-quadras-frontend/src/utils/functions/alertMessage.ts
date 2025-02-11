import { useGlobalStore } from '@/stores/globalStore'
import type { AlertType } from '../types/alert.type'

const globalStore = useGlobalStore()

export const alertMessage = (text: string) => {
  Object.assign(globalStore.alert, {
    isActive: true,
    text: text,
    type: 'success',
  })

  setTimeout(() => {
    Object.assign(globalStore.alert, {
      isActive: false,
      text: '',
      type: undefined as AlertType,
    })
  }, 3000)
}
