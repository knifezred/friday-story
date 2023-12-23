import { defineStore } from 'pinia'
import { store } from '../index'
import { ArchiveData, Room } from '@renderer/data/entities'
import projectSetting from '@renderer/settings/projectSetting'
import { useDbStore } from './db'
import { useUIStore } from './ui'

interface AppState {
  darkMode?: boolean
  archiveId: number
  archiveData: ArchiveData
  rooms: Room[]
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: projectSetting.darkMode,
    archiveId: 0,
    archiveData: {} as ArchiveData,
    rooms: []
  }),
  getters: {
    getArchiveData(): ArchiveData {
      return this.archiveData
    }
  },
  actions: {
    // 保存存档
    setSaveData(index: number): void {
      if (index == 0) {
        index = this.archiveId
      }
      const dbStore = useDbStore()
      dbStore.getDb.archives.put(
        {
          id: this.archiveId,
          title: 'asd',
          data: JSON.stringify(this.archiveData),
          savedTime: new Date()
        },
        index
      )
    },
    // 读取存档
    async loadSaveData(index: number): Promise<void> {
      const dbStore = useDbStore()
      dbStore.getDb.archives.get(index).then(async (archive) => {
        const uiStore = useUIStore()
        let roomId = 0
        if (archive === null || archive === undefined) {
          console.log('存档不存在')
          this.archiveId = 1
        } else {
          this.archiveId = archive.id
          this.archiveData = JSON.parse(archive.data) as ArchiveData
          roomId = this.archiveData.roomId
        }
        console.log('load room ' + this.archiveData.roomId)
        await uiStore.setRoom(roomId)
      })
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
