import { defineStore } from 'pinia'
import { store } from '../index'
import { Ref, ref } from 'vue'
import { AllRooms, Room } from '@renderer/data/roomData'

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
  id: 'app',
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
    setRoom(room: Room | undefined): void {
      if (room == null) {
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
    }
  }
})

export function useUIStoreWithOut() {
  return useUIStore(store)
}
