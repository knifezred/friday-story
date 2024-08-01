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
                'condition.' + condition.type + (result != condition.result ? 'True' : 'False')
            }
          } else {
            checkResult.text = condition.failure
          }
          let i18nValue = condition.value
          if (condition.type == 'hasItem') {
            i18nValue = 'items.' + condition.value + '.title'
          }
          checkResult.text = $t(checkResult.text as never, { value: $t(i18nValue as never) })
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
        const result = effectHook[effect.type](effect.value)

        let tempText: string | undefined = ''
        tempText = result ? effect.success : effect.failure
        if (tempText == undefined) {
          if (effect.text == undefined) {
            tempText = 'effect.' + effect.type + (result ? 'True' : 'False')
          } else {
            tempText = effect.text
          }
        }

        let i18nValue = effect.value
        if (effect.type == 'addItem') {
          i18nValue = 'items.' + effect.value.split(',')[0] + '.title'
          tipsAddItem(i18nValue, effect.value.split(',')[1])
        } else if (effect.type == 'useItem') {
          i18nValue = 'items.' + effect.value.split(',')[0] + '.title'
          tipsUseItem(i18nValue, effect.value.split(',')[1])
        } else {
          resultText.push($t(tempText as never, { value: $t(i18nValue as never) }))
        }
      }
    }
  }
  return resultText
}

function tipsAddItem(text: string, num: string) {
  window.$message?.info($t(text as never) + ' x ' + num)
}
function tipsUseItem(text: string, num: string) {
  window.$message?.info($t(text as never) + ' - ' + num)
}
