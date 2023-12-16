import { defineStore } from 'pinia'
import { store } from '../index'
import projectSetting from '@renderer/settings/projectSetting'
// import { Ref, ref } from 'vue'

interface TimerState {
  worldTime: Date
}
export const useCharacterStore = defineStore({
  id: 'timer',
  state: (): TimerState => ({
    worldTime: projectSetting.worldTime
  }),
  getters: {},
  actions: {}
})

export function useCharacterStoreWithOut() {
  return useCharacterStore(store)
}
