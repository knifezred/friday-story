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
      result = action.text
    }
    console.log(action)
    return result
  }

  function loadActionOptions(
    optionList: Dto.ActionOption[] | undefined,
    next: string | undefined | null
  ) {
    options.value = []
    if (next != undefined && next != null) {
      if (!optionExists('map.next', optionList)) {
        const defaultMapNext = getOptionByName('map.next', DefaultActions)
        defaultMapNext.next = next
        options.value.push(defaultMapNext)
      }
    }
    if (optionList != undefined) {
      for (const option of optionList) {
        options.value.push(option)
      }
    }
    return options.value
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
