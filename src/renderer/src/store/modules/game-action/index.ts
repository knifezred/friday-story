import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, executeEffects } from '@renderer/hooks/game/index'
import { projectSetting } from '@renderer/settings/projectSetting'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGameStore } from '../game'

export const useGameActionStore = defineStore(SetupStoreId.GameAction, () => {
  const currentAction = ref<Dto.ActionOption>({
    name: 'game.option.demo',
    text: 'game.option.demo',
    type: 'map',
    line: []
  })
  const options = ref<Array<Dto.ActionOption>>([])

  const gameStore = useGameStore()

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
          window.$message?.info(r)
        }
      }
      // action计数
      gameStore.countOptionExecute(action.name)
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
      window.$message?.warning(executeResult.text)
    }
  }

  function loadActionOptions(optionList: Dto.ActionOption[] | undefined, next: string | undefined) {
    const checkInfos: string[] = []
    options.value = []
    if (next != undefined && next != '') {
      if (!optionExists('game.map.next', optionList) && gameStore.sceneType == 'map') {
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
