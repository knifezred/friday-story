import { defineStore } from 'pinia'
import { store } from '../index'

interface AppState {
  darkMode?: boolean
  dateTime?: Date
  saveData: string
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: true,
    dateTime: new Date(),
    saveData: ''
  }),
  getters: {
    getSaveData(): string {
      return this.saveData
    }
  },
  actions: {
    // 保存存档
    setSaveData(save: string, index: number): void {
      this.saveData = save
      localStorage.setItem('save' + index, save)
    },
    // 读取存档
    loadSaveData(index: number): void {
      this.saveData = localStorage.getItem('save' + index) as string
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
