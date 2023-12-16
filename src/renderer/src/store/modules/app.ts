import { defineStore } from 'pinia'
import { store } from '../index'
import { Room } from '@renderer/data/entities'
import projectSetting from '@renderer/settings/projectSetting'
import { DbDexie, connDb } from '../../data/entities'

interface AppState {
  darkMode?: boolean
  saveData: string
  rooms: Room[]
  db: DbDexie
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: projectSetting.darkMode,
    saveData: '',
    rooms: [],
    db: connDb(projectSetting.database)
  }),
  getters: {
    getSaveData(): string {
      return this.saveData
    },
    getDb(): DbDexie {
      return this.db
    }
  },
  actions: {
    setDb(dbName: string): void {
      this.db = connDb(dbName)
    },
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
