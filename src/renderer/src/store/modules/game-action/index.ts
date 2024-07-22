import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMapStore } from '../game-map'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const mapStore = useMapStore()
  const currentAction = ref<Dto.ActionOption>({
    name: 'option.demo',
    text: 'option.demo',
    type: 'map'
  })
  const options = ref<Array<Dto.ActionOption>>([])

  function beforeExecute() {
    if (
      mapStore.currMap.name == 'map.building.house_lin' &&
      currentAction.value.name == 'knocked'
    ) {
      return '你敲了敲门，但没有人回应'
    }
    console.log('before execute')
    return 'option.noReply'
  }

  function executeAction(action: Dto.ActionOption) {
    let result = action.text
    currentAction.value = action
    result = beforeExecute()
    console.log(action)
    return result
  }

  function loadActionOptions(map: Dto.MapItem | null, scene: Dto.GameScene | null) {
    options.value = []
    if (map != null) {
      if (map.options.length > 0) {
        options.value = DefaultActions.filter((x) => map.options.includes(x.name))
      }
      if (map.isLocked == true) {
        options.value.push(DefaultActions.filter((x) => x.name == 'knocked')[0])
      }
    }
    if (scene != null) {
      if (scene.options.length > 0) {
        options.value = DefaultActions.filter((x) => scene.options.includes(x.name))
      }
    }
    return options
  }

  return { currentAction, options, beforeExecute, executeAction, loadActionOptions }
})
