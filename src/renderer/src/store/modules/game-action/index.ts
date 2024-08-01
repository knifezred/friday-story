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
      if (result.success) {
        currentAction.value.canExecute = true
      } else {
        currentAction.value.canExecute = false
        return result.text
      }
    }
    return ''
  }

  function executeAction(action: Dto.ActionOption) {
    const resMsg: string[] = []
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
          break
      }
      const effectResults = executeEffects(action.effect)
      for (const r of effectResults) {
        resMsg.push(r)
      }
    } else {
      resMsg.push(result)
    }
    if (resMsg.length == 0) {
      resMsg.push(action.text + 'Info')
    }
    return resMsg
  }

  function loadActionOptions(optionList: Dto.ActionOption[] | undefined, next: string | undefined) {
    const checkInfos: string[] = []
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
          // todo check message
          const lockedConditions = option.condition.filter((x) => x.for == 'lock')
          for (const lockCondition of lockedConditions) {
            const res = checkCondition(lockCondition)
            option.locked = !res.success
            if (res.success && res.text != '') {
              checkInfos.push(res.text)
            }
          }
          const showConditions = option.condition.filter((x) => x.for == 'show')
          for (const showCondition of showConditions) {
            const res = checkCondition(showCondition)
            option.isShow = res.success
            if (res.success && res.text != '') {
              checkInfos.push(res.text)
            }
          }
        }
        options.value.push(option)
      }
    }
    return checkInfos
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
