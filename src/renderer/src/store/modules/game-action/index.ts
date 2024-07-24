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

  function beforeExecute(action: Dto.ActionOption) {
    currentAction.value = action
    console.log('before execute')
    const result = checkCondition(currentAction.value.condition)
    if (result != '') {
      currentAction.value.canExecute = false
      return result
    } else {
      currentAction.value.canExecute = true
    }
    return ''
  }

  function executeAction(action: Dto.ActionOption) {
    let result = action.text
    currentAction.value = action
    result = beforeExecute(currentAction.value)
    if (result == '') {
      currentAction.value.canExecute = true
    }
    console.log(action)
    return result
  }

  function loadActionOptions(map: Dto.MapItemFull | null, scene: Dto.GameScene | null) {
    options.value = []
    if (map != null) {
      if (map.next != undefined) {
        if (!optionExists('map.next', map.options)) {
          const defaultMapNext = getOptionByName('map.next', DefaultActions)
          defaultMapNext.next = map.next
          options.value.push(defaultMapNext)
        }
      }
      if (map.options != undefined) {
        for (const option of map.options) {
          options.value.push(option)
        }
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

  function optionExists(name: string, list: Array<Dto.ActionOption> | undefined) {
    if (list == undefined) {
      return false
    }
    return list.filter((x) => x.name == name).length > 0
  }

  return { currentAction, options, beforeExecute, executeAction, loadActionOptions }
})
