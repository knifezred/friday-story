import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, executeEffects } from '@renderer/hooks/game/index'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '../app'
import { useAuthStore } from '../auth'
import { useMapStore } from '../game-map'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const currentAction = ref<Dto.ActionOption>({
    name: 'option.demo',
    text: 'option.demo',
    type: 'map'
  })
  const options = ref<Array<Dto.ActionOption>>([])

  const appStore = useAppStore()
  const authStore = useAuthStore()

  const mapStore = useMapStore()

  function beforeExecute(action: Dto.ActionOption) {
    currentAction.value = action
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
          result = authStore.useItem('material.wood', 1)
          if (result.includes('Success') && mapStore.currMap.temperature != undefined) {
            mapStore.currMap.temperature += 5
            if (mapStore.currMap.temperature <= 0) {
              resMsg.push('火堆冒出火苗')
            }
            if (mapStore.currMap.temperature >= 1 && mapStore.currMap.temperature < 10) {
              resMsg.push('火堆大了一点')
            }
            if (mapStore.currMap.temperature >= 10 && mapStore.currMap.temperature < 30) {
              resMsg.push('火烧的很旺')
            }
            if (mapStore.currMap.temperature >= 30 && mapStore.currMap.temperature < 40) {
              resMsg.push('火有点大了')
            }
            resMsg.push(mapStore.currMap.text)
          } else {
            resMsg.push(result)
          }

          break

        default:
          resMsg = [action.text + 'Info']
          break
      }
      const effectResults = executeEffects(action.effect)
      for (const r of effectResults) {
        resMsg.push(r)
      }
    } else {
      resMsg.push(result)
    }
    return resMsg
  }

  function loadActionOptions(optionList: Dto.ActionOption[] | undefined, next: string | undefined) {
    options.value = []
    if (next != undefined && next != '') {
      if (!optionExists('map.next', optionList) && appStore.currentSceneType == 'map') {
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
