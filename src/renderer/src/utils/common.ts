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
