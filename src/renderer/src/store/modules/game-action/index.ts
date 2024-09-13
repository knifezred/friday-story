import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, executeEffects } from '@renderer/hooks/game/index'
import { projectSetting } from '@renderer/settings/projectSetting'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGameStore } from '../game'
import { useMapStore } from '../game-map'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const currentAction = ref<Dto.ActionOption>({
    name: 'game.option.demo',
    text: 'game.option.demo',
    type: 'map'
  })
  const options = ref<Array<Dto.ActionOption>>([])

  const gameStore = useGameStore()

  const mapStore = useMapStore()

  function beforeExecute(action: Dto.ActionOption) {
    currentAction.value = action
    let result: Dto.ConditionResult = {
      success: true,
      text: ''
    }
    if (currentAction.value.condition != undefined) {
      const executeCondition = currentAction.value.condition.filter((x) => x.for == 'execute')[0]
      if (executeCondition != undefined) {
        result = checkCondition(executeCondition)
        if (result.success) {
          currentAction.value.canExecute = true
        } else {
          currentAction.value.canExecute = false
        }
      }
    }
    return result
  }

  async function executeAction(action: Dto.ActionOption) {
    currentAction.value = action
    const executeResult = beforeExecute(currentAction.value)
    if (executeResult.success) {
      currentAction.value.canExecute = true
      // 执行动作
      const effectResults = executeEffects(action.effect)
      for (const r of effectResults) {
        if (r.length > 0) {
          gameStore.currentScene.text.push(r)
        }
      }
      // action计数
      gameStore.countOptionExecute(action.name)
      switch (action.name) {
        case 'game.option.addWood':
          if (mapStore.currMap.temperature != undefined) {
            mapStore.currMap.temperature += 5
            if (mapStore.currMap.temperature <= 0) {
              gameStore.currentScene.text.push('火堆冒出火苗')
            }
            if (mapStore.currMap.temperature >= 1 && mapStore.currMap.temperature < 10) {
              gameStore.currentScene.text.push('火堆大了一点')
            }
            if (mapStore.currMap.temperature >= 10 && mapStore.currMap.temperature < 30) {
              gameStore.currentScene.text.push('火烧的很旺')
            }
            if (mapStore.currMap.temperature >= 30 && mapStore.currMap.temperature < 40) {
              gameStore.currentScene.text.push('火有点大了')
            }
            gameStore.currentScene.text.push(mapStore.currMap.text)
          } else {
            gameStore.currentScene.text.push(executeResult.text)
          }
          break

        default:
          gameStore.currentScene.text.push(mapStore.currMap.text)
          break
      }
      // 操作冷却时间
      await new Promise((resolve) => {
        setTimeout(
          () => {
            resolve(1)
          },
          action.duration == undefined ? projectSetting.duration : action.duration
        )
      })
    } else {
      gameStore.currentScene.text.push(executeResult.text)
    }
  }

  function loadActionOptions(optionList: Dto.ActionOption[] | undefined, next: string | undefined) {
    const checkInfos: string[] = []
    options.value = []
    if (next != undefined && next != '') {
      if (!optionExists('game.map.next', optionList) && gameStore.currentSceneType == 'map') {
        const defaultMapNext = getOptionByName('game.map.next', DefaultActions)
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

  function cleanOptions() {
    options.value = []
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

  return { currentAction, options, beforeExecute, executeAction, loadActionOptions, cleanOptions }
})
