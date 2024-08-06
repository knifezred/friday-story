import { DefaultActions } from '@renderer/constants/data/action'
import { DefaultScenes, DefaultStories } from '@renderer/constants/data/story'
import { SetupStoreId } from '@renderer/enums'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { useGameStore } from '../game'
import { useMapStore } from '../game-map'

export const useStoryStore = defineStore(SetupStoreId.GameStory, () => {
  const currentStory = ref<Dto.StoryPlot>({
    name: 'none',
    type: 'main-line',
    cover: '',
    text: [],
    nextScene: ''
  })

  const authStore = useAuthStore()
  const mapStore = useMapStore()
  function getStoryScene(sceneName: string) {
    return DefaultScenes.filter((x) => x.name == sceneName)[0]
  }
  function setCurrentStory(name: string) {
    if (DefaultStories.filter((x) => x.name == name).length > 0) {
      currentStory.value = DefaultStories.filter((x) => x.name == name)[0]
    }
  }

  function getOptions(optionNames: string[]) {
    const options: Array<Dto.ActionOption> = []
    DefaultActions.forEach((x) => {
      if (optionNames.includes(x.name)) {
        options.push(x)
      }
    })
    return options
  }

  function initStory() {
    DefaultStories.forEach((item) => {
      let localizationText = localeText(item.text, item.name, 'stories', '')
      if (typeof localizationText == 'string') {
        localizationText = [localizationText]
      }
      item.text = localizationText
      item.cover = prefixImage(item.cover, item.name, 'stories', '')
    })

    DefaultScenes.forEach((item) => {
      let localizationText = localeText(item.text, item.name, 'stories', 'text')
      if (typeof localizationText == 'string') {
        localizationText = [localizationText]
      }
      item.text = localizationText
      item.title = localeText(item.text, item.name, 'stories', 'title').toString()
      item.cover = prefixImage(item.cover, item.name, 'stories', '')
    })
  }

  async function storyFinished(storyName: string) {
    authStore.addFlag(SetupStoreId.GameStory + '.finished.' + storyName, '1')
    useGameStore().currentSceneType = 'map'
    await mapStore.initMap(authStore.userInfo.archive.place)
  }

  return { currentStory, setCurrentStory, getStoryScene, getOptions, initStory, storyFinished }
})
