import { $t } from '@renderer/locales'

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
export function formatTimestamp(timestamp) {
  // 创建一个Date对象
  const date = new Date(timestamp)

  // 获取年份（四位数）
  const year = date.getFullYear()

  // 获取月份（两位数，01-12）
  const month = String(date.getMonth() + 1).padStart(2, '0')

  // 获取日期（两位数，01-31）
  const day = String(date.getDate()).padStart(2, '0')

  // 获取小时（两位数，00-23）
  const hours = String(date.getHours()).padStart(2, '0')

  // 获取分钟（两位数，00-59）
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // 获取秒数（两位数，00-59）
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 返回格式化后的字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
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
