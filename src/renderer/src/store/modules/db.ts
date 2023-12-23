import { defineStore } from 'pinia'
import { store } from '../index'
import { Archive } from '@renderer/data/entities'
import projectSetting from '@renderer/settings/projectSetting'
import { DbDexie, connDb } from '../../data/entities'

interface DbState {
  db: DbDexie
}
export const useDbStore = defineStore({
  id: 'db',
  state: (): DbState => ({
    db: connDb(projectSetting.database)
  }),
  getters: {
    getDb(): DbDexie {
      return this.db
    }
  },
  actions: {
    setDb(dbName: string): void {
      this.db = connDb(dbName)
    },
    async loadArchiveList(): Promise<Archive[]> {
      return await this.db.archives.toArray()
    }
  }
})

export function useDbStoreWithOut() {
  return useDbStore(store)
}
