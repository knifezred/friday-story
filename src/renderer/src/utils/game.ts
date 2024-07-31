import { useActionEffect } from '@renderer/hooks/game/action-effect'
import { useCondition } from '@renderer/hooks/game/condition'
import { $t } from '@renderer/locales'
import { randomInt } from './common'

export function checkCondition(conditionModel: Dto.ConditionModel | undefined) {
  let resultText = ''
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
              condition.text = 'condition.' + condition.type + (result ? 'True' : 'False')
            }
          } else {
            condition.text = condition.failure
          }
          let i18nValue = condition.value
          if (condition.type == 'hasItem') {
            i18nValue = 'items.' + condition.value + '.title'
          }
          resultText = $t(condition.text as never, { value: $t(i18nValue as never) })
        } else {
          // or模式任意一个成功就返回成功
          if (conditionModel.type == 'or') {
            return ''
          }
        }
      }
      // and模式下任意一个不满足就跳出
      if (conditionModel.type == 'and' && resultText != '') {
        return resultText
      }
    }
  }
  return resultText
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
        if (effect.failure == undefined) {
          if (effect.text == undefined) {
            effect.text = 'effect.' + effect.type + (result ? 'True' : 'False')
          }
        } else {
          effect.text = effect.failure
        }
        let i18nValue = effect.value
        if (effect.type == 'addItem') {
          i18nValue = 'items.' + effect.value.split(',')[0] + '.title'
          resultText.push(
            $t(effect.text as never, {
              value: $t(i18nValue as never) + ' X ' + effect.value.split(',')[1]
            })
          )
        } else {
          resultText.push($t(effect.text as never, { value: $t(i18nValue as never) }))
        }
      }
    }
  }
  return resultText
}
