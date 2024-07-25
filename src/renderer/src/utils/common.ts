import { useCondition } from '@renderer/hooks/game/condition'
import { $t } from '@renderer/locales'
import dayjs from 'dayjs'

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[]
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string | number>[]) {
  return options.map((option) => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }))
}

/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className)
  }

  function remove() {
    document.documentElement.classList.remove(className)
  }

  return {
    add,
    remove
  }
}

export function staticPath(src: string) {
  return 'http://localhost:5175' + src
}

// 格式化时间戳
export function formatTimestamp(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss') {
  // 返回格式化后的字符串
  return dayjs(timestamp).format(format)
}

export function formatSeconds(seconds) {
  // 获取小时数
  const hours = Math.floor(seconds / (60 * 60))

  // 获取分钟数，并对小时取余后的秒数进行分钟计算
  const minutes = Math.floor((seconds % (60 * 60)) / 60)

  // 获取剩余的秒数
  const remainingSeconds = seconds % 60

  // 格式化输出
  // 如果小时、分钟或秒数小于10，则前面补0
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 数字补零
export function formatNumber(num: number, length: number) {
  return num.toString().padStart(length, '0')
}

export function listAllStaticFiles() {
  return window.electron.ipcRenderer.invoke('list-static-files')
}

export function getLevelType(level: Dto.LevelType) {
  let type: Dto.Type = 'primary'
  if (level == 'SSR') {
    type = 'error'
  }
  if (level == 'SR') {
    type = 'warning'
  }
  if (level == 'R') {
    type = 'info'
  }
  if (level == 'N') {
    type = 'success'
  }
  return type
}

export function localeText(
  text: string | string[] | undefined,
  name: string,
  prefix: string,
  suffix: string
) {
  if (suffix != '') {
    suffix = '.' + suffix
  }
  prefix = prefix + '.' + name
  if (text == undefined) {
    text = prefix + suffix
  } else if (typeof text == 'string') {
    if (text.startsWith('.')) {
      text = prefix + text
    } else if (text == '') {
      text = prefix + suffix
    }
  } else if (text != undefined) {
    //array
    for (let index = 0; index < text.length; index++) {
      if (text[index].startsWith('.')) {
        text[index] = prefix + text[index]
      } else if (text[index] == '') {
        text[index] = prefix + suffix + index
      }
    }
  }
  return text
}

export function prefixImage(
  text: string | undefined,
  name: string,
  prefix: string,
  suffix: string
) {
  prefix = '/static/' + prefix + '/' + name.replaceAll('.', '/')
  if (text == undefined) {
    text = prefix + suffix
  } else {
    // 不以/开头加prefix
    if (!text.startsWith('/')) {
      text = prefix + text
    }
    // 不含.加suffix
    if (text.indexOf('.') == -1) {
      text = text + suffix
    }
  }
  return text
}

export async function dynamicResource(filePath: string) {
  const files = await window.api.listDir(filePath)
  if (files.length == 0) {
    return filePath
  } else {
    const randIndex = getRandomInt(0, files.length - 1)
    return files[randIndex]
  }
}

export function getRandomInt(min: number, max: number) {
  // 确保min小于max
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function checkCondition(conditionModel: Dto.ConditionModel | undefined) {
  let resultText = ''
  if (conditionModel != undefined) {
    const conditionHook = useCondition()
    for (const condition of conditionModel.conditions) {
      if (conditionHook[condition.type]) {
        const result = conditionHook[condition.type](condition.value)
        // 条件判定失败
        if (result != condition.result) {
          if (condition.text == undefined) {
            condition.text = 'condition.' + condition.type + (result ? 'True' : 'False')
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
