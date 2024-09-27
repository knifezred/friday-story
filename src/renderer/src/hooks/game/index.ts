import { useActionEffect } from '@renderer/hooks/game/action-effect'
import { useCondition } from '@renderer/hooks/game/condition'
import { $t } from '@renderer/locales'
import { randomInt } from '@renderer/utils/common'

export function checkCondition(conditionModel: Dto.ConditionModel | undefined) {
  const checkResult: Dto.ConditionResult = {
    success: true,
    text: ''
  }
  if (conditionModel != undefined) {
    const conditionHook = useCondition()
    for (const condition of conditionModel.conditions) {
      if (conditionHook[condition.type]) {
        const result = conditionHook[condition.type](condition.value)
        if (condition.result == undefined) {
          // 默认验证条件为true
          condition.result = true
        }
        // 条件判定失败
        if (result != condition.result) {
          if (condition.failure == undefined) {
            if (condition.text == undefined) {
              checkResult.text =
                'game.condition.' + condition.type + (result == condition.result ? 'True' : 'False')
            }
          } else {
            checkResult.text = condition.failure
          }
          let val1 = condition.value
          let val2 = ''
          if (val1.includes(',')) {
            val1 = condition.value.split(',')[0]
            val2 = condition.value.split(',')[1]
          }
          val1 = rebuildVal1(val1, condition.type)
          checkResult.text = $t(checkResult.text as never, { item: $t(val1 as never), value: val2 })
          checkResult.success = false
        } else {
          checkResult.success = true
          if (condition.success != undefined) {
            checkResult.text = condition.success
          }
          // or模式任意一个成功就返回成功
          if (conditionModel.type == 'or') {
            return checkResult
          }
        }
      }
      // and模式下任意一个不满足就跳出
      if (conditionModel.type == 'and' && !checkResult.success) {
        return checkResult
      }
    }
  }
  return checkResult
}

export function executeEffects(effectModel: Dto.ActionEffectModel | undefined) {
  const resultText: string[] = []
  if (effectModel != undefined) {
    const effectHook = useActionEffect()
    // 默认是全部都生效
    let effects = effectModel.effects
    // single 随机取一个效果
    if (effectModel.type == 'single') {
      effects = [effects[randomInt(0, effects.length - 1)]]
    }
    for (const effect of effects) {
      if (effectHook[effect.type]) {
        let tempText: string | undefined = ''
        let val1 = effect.value
        let val2 = ''
        if (val1.includes(',')) {
          val1 = effect.value.split(',')[0]
          val2 = effect.value.split(',')[1]
        }
        const result = effectHook[effect.type](effect.value)
        if (typeof result == 'boolean') {
          tempText = result ? effect.success : effect.failure
        } else {
          // addItem返回对象
          tempText = result.success ? effect.success : effect.failure
          val1 = result.val1
          val2 = result.val2
        }
        val1 = rebuildVal1(val1, effect.type)
        if (tempText == undefined) {
          if (effect.text == undefined) {
            tempText = 'game.effect.' + effect.type + (result ? 'True' : 'False')
          } else {
            tempText = effect.text
          }
        }
        if (effect.notification != true) {
          resultText.push($t(tempText as never, { item: $t(val1 as never), value: val2 }))
        } else {
          notificationResult($t(tempText as never, { item: $t(val1 as never), value: val2 }))
        }
      } else {
        window.$message?.warning(effect.text ?? '尚未实装')
      }
    }
  }
  return resultText
}

function rebuildVal1(value: string, type: string) {
  if (type.includes('Item')) {
    value = 'game.items.' + value + '.title'
  }
  if (type.includes('Map')) {
    value = 'game.map.' + value.replace('room.', 'building.') + '.title'
  }
  return value
}

function notificationResult(text: string) {
  window.$message?.success(text)
}
