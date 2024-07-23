import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref, unref } from 'vue'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const currentAction = ref<Dto.ActionOption>({
    name: 'option.demo',
    text: 'option.demo',
    type: 'map'
  })
  const options = ref<Array<Dto.ActionOption>>([])

  function beforeExecute() {
    console.log('before execute')
    const result = checkCondition(currentAction.value.condition)
    if (result != '') {
      return result
    }
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
    let optionsNames: Array<string> = []
    if (map != null) {
      optionsNames = unref(map.options)
      if (optionsNames.length > 0) {
        if (map.isLocked == true) {
          optionsNames.push('knocked')
          optionsNames = optionsNames.filter((x) => x != 'enter')
        }
      }
    }
    if (scene != null) {
      if (scene.options.length > 0) {
        optionsNames = unref(scene.options)
      }
    }
    options.value = DefaultActions.filter((x) => optionsNames.includes(x.name))
  }

  return { currentAction, options, beforeExecute, executeAction, loadActionOptions }
})
