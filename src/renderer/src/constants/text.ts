import { transformRecordToOption } from '@renderer/utils/common'

export const storyTextRecord: Record<string, App.I18n.I18nKey> = {
  text1: 'map.text.text1',
  text2: 'map.text.text2',
  text3: 'map.text.text3',
  text4: 'map.text.text4'
}

export const storyTextOptions = transformRecordToOption(storyTextRecord)
