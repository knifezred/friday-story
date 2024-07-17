import { transformRecordToOption } from '@renderer/utils/common'

export const storyTextRecord: Record<string, App.I18n.I18nKey> = {
  'home-text': 'map.home.home.text'
}

export const storyTextOptions = transformRecordToOption(storyTextRecord)
