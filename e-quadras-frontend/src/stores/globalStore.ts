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
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    initializeAuth() {
      this.isAuthenticated = this.checkToken()
    },

    checkToken(): boolean {
      const token = localStorage.getItem('token')

      if (!token) {
        return false
      }

      return true
    },
  },
})
