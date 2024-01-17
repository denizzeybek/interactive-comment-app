import { defineStore } from 'pinia'
import { EStoreNames } from '@/constants/storeNames'

interface State {
  currentPage: number
}

export const useCommonStore = defineStore(EStoreNames.COMMON, {
  state: (): State => ({
    currentPage: 1
  }),
  actions: {
    setCurrentPage(payload: number) {
      this.currentPage = payload;
    }
  }
})
