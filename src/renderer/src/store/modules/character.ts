import { defineStore } from 'pinia'
import { store } from '../index'
import { Character } from '@renderer/data/entities'
// import { Ref, ref } from 'vue'

interface CharacterState {
  player: Character
}
export const useCharacterStore = defineStore({
  id: 'character',
  state: (): CharacterState => ({
    player: {} as Character
  }),
  getters: {},
  actions: {}
})

export function useCharacterStoreWithOut() {
  return useCharacterStore(store)
}
