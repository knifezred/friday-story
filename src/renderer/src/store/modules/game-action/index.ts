import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, executeEffects } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '../app'
import { useAuthStore } from '../auth'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const currentAction = ref<Dto.ActionOption>({
    name: 'option.demo',
    text: 'option.demo',
    type: 'map'
  })
  const options = ref<Array<Dto.ActionOption>>([])

  const appStore = useAppStore()
  const authStore = useAuthStore()

  function beforeExecute(action: Dto.ActionOption) {
    currentAction.value = action
    console.log('before execute')
    if (currentAction.value.condition != undefined) {
      const result = checkCondition(
        currentAction.value.condition.filter((x) => x.for == 'execute')[0]
      )
      if (result != '') {
        currentAction.value.canExecute = false
        return result
      } else {
        currentAction.value.canExecute = true
      }
    }
    return ''
  }

  function executeAction(action: Dto.ActionOption) {
    let resMsg: string[] = []
    let result = action.text
    currentAction.value = action
    result = beforeExecute(currentAction.value)
    if (result == '') {
      currentAction.value.canExecute = true
      // 执行动作
      switch (action.name) {
        case 'option.addWood':
          if (authStore.archivedData.items.filter((x) => x.name == 'other.wood').length > 0) {
            authStore.useItem('other.wood', 1)
            appStore.temperature += 5

            if (appStore.temperature < 0) {
              resMsg = ['火堆冒出火苗']
              resMsg.push('屋内依旧很寒冷')
            }
            if (appStore.temperature > 1 && appStore.temperature < 10) {
              resMsg = ['火堆很温暖']
              resMsg.push('屋内稍微暖和一些')
            }
            if (appStore.temperature > 10 && appStore.temperature < 30) {
              resMsg = ['火烧的很旺']
              resMsg.push('屋内温度很宜人')
            }
            if (appStore.temperature > 30 && appStore.temperature < 40) {
              resMsg = ['火有点大了']
              resMsg.push('屋内有点热')
            }
          } else {
            resMsg = ['你没有木头']
          }
          break

        default:
          resMsg = [action.text + 'Info']
          break
      }
      executeEffects(action.effect)
    } else {
      resMsg = [result]
    }
    return resMsg
  }

  function loadActionOptions(
    optionList: Dto.ActionOption[] | undefined,
    next: string | undefined | null
  ) {
    options.value = []
    console.log(appStore.currentSceneType)
    if (next != undefined && next != null) {
      if (!optionExists('map.next', optionList)) {
        const defaultMapNext = getOptionByName('map.next', DefaultActions)
        defaultMapNext.next = next
        options.value.push(defaultMapNext)
      }
    }
    if (optionList != undefined) {
      for (const option of optionList) {
        if (option.condition != undefined) {
          const res = checkCondition(option.condition.filter((x) => x.for == 'load')[0])
          if (res != '') {
            option.locked = true
          } else {
            option.locked = false
          }
        }
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
