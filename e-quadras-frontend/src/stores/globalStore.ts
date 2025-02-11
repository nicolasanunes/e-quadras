import type { AlertType } from '@/utils/types/alert.type'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    loading: false,
    alert: {
      isActive: false,
      text: '',
      type: undefined as AlertType,
    },
  }),
  actions: {},
})
