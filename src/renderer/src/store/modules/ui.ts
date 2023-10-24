import { defineStore } from 'pinia'
import { store } from '../index'
import { Ref, ref } from 'vue'

interface UiState {
  darkMode?: boolean
  story?: Ref<string>
  scene: Ref<SceneMedia>
  appBar?: string
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
    story: ref('hello world')
  }),
  getters: {
    getStory(): string {
      return this.story ?? ''
    },
    getScene(): SceneMedia {
      return this.scene
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
    }
  }
})

export function useUIStoreWithOut() {
  return useUIStore(store)
}
