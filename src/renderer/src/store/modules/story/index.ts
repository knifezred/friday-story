import { DefaultScenes, DefaultStories } from '@renderer/constants/data/story'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'

export const useShopStore = defineStore(SetupStoreId.Shop, () => {
  function initStory() {
    DefaultStories.forEach((item) => {
      item.cover = '/static/stories/' + item.name.replaceAll('.', '/') + '.png'
    })

    DefaultScenes.forEach((item) => {
      item.cover = '/static/stories/' + item.name.replaceAll('.', '/') + '.png'
    })
  }
  initStory()

  return {}
})
