import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  function loadActionOptions(map: Dto.MapItemFull | null, scene: Dto.GameScene | null) {
    options.value = []
    if (map != null) {
      if (map.nextId != undefined) {
        if (!optionExists('map.next', map.options)) {
          options.value.push(getOptionByName('map.next', DefaultActions))
        }
      }
      for (const option of map.options) {
        options.value.push(option)
      }
    }
    if (scene != null) {
      if (scene.options.length > 0) {
        for (const option of scene.options) {
          options.value.push(option)
        }
      }
    }
  }

  function getOptionByName(name: string, list: Array<Dto.ActionOption>) {
    return list.filter((x) => x.name == name)[0]
  }

  function optionExists(name: string, list: Array<Dto.ActionOption>) {
    return list.filter((x) => x.name == name).length > 0
  }

  return { currentAction, options, beforeExecute, executeAction, loadActionOptions }
})
