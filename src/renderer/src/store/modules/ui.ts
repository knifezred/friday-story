import { defineStore } from 'pinia'
import { store } from '../index'
import { Ref, ref } from 'vue'
import { AllRooms } from '@renderer/data/roomData'
import { Room } from '@renderer/data/entities'
import { useDbStore } from './db'

interface UiState {
  darkMode?: boolean
  story?: Ref<string>
  scene: Ref<SceneMedia>
  sceneRooms: Ref<Room[]>
}
export interface SceneMedia {
  src: string
  type: string
  title: string
}
export const useUIStore = defineStore({
  id: 'ui',
  state: (): UiState => ({
    darkMode: true,
    scene: ref({ src: '', type: 'img', title: '' }),
    story: ref('hello world'),
    sceneRooms: ref([])
  }),
  getters: {
    getStory(): string {
      return this.story ?? ''
    },
    getScene(): SceneMedia {
      return this.scene
    },
    getSceneRooms(): Room[] {
      return this.sceneRooms
    }
  },
  actions: {
    setStory(info: string | undefined): void {
      this.story = info
    },
    setScene(src: string | undefined): void {
      this.scene.src = src as string
      if (this.scene.src.endsWith('mp4')) {
        this.scene.type = 'video'
      } else {
        this.scene.type = 'img'
      }
    },
    setSceneRooms(room: Room): void {
      this.sceneRooms = AllRooms.filter((x) => x.pid.split(',').indexOf(room.id.toString()) > -1)
    },
    async setRoom(roomId: number): Promise<void> {
      const dbStore = useDbStore()
      await dbStore.getDb.rooms.get(roomId).then((room) => {
        debugger
        if (room == undefined) {
          room = AllRooms[0]
        }
        if (room.media == undefined || room.media == '') {
          this.setScene(room.bg)
        } else {
          this.setScene(room.media)
        }
        this.scene.title = room.name as string
        this.setStory(room.description)
        this.setSceneRooms(room)
      })
    }
  }
})

export function useUIStoreWithOut() {
  return useUIStore(store)
}
