import { DefaultActions } from '@renderer/constants/data/action'
import { DefaultScenes, DefaultStories } from '@renderer/constants/data/story'
import { SetupStoreId } from '@renderer/enums'
import { parseRenPyScript } from '@renderer/hooks/game/renpy'
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
    nextScene: '',
    script: ''
  })

  const authStore = useAuthStore()
  const mapStore = useMapStore()

  const currentStoryScenes = ref<Array<Dto.RenPyScene>>([])

  function getStoryScene(sceneName: string) {
    if (sceneName == null) {
      sceneName = 'start'
    }
    return currentStoryScenes.value.filter((x) => x.name == sceneName)[0]
  }

  function getSceneOptions(sceneName: string, menuName: string) {
    return currentStoryScenes.value
      .filter((x) => x.name == sceneName)[0]
      .menus.filter((x) => x.name == menuName.replace('menu ', ''))[0].options
  }

  async function setCurrentStory(name: string) {
    if (DefaultStories.filter((x) => x.name == name).length > 0) {
      currentStory.value = DefaultStories.filter((x) => x.name == name)[0]
      currentStoryScenes.value = await parseRenPyScript(currentStory.value.script)
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
      const localizationText = localeText(item.text, item.name, 'stories', '')
      item.text = [localizationText]
      item.cover = prefixImage(item.cover, item.name, 'stories', '')
    })

    DefaultScenes.forEach((item) => {
      const localizationText = localeText(item.text, item.name, 'stories', 'text')
      item.text = [localizationText]
      item.title = localeText(item.text, item.name, 'stories', 'title').toString()
      item.cover = prefixImage(item.cover, item.name, 'stories', '')
    })
  }

  async function storyFinished(storyName: string) {
    authStore.setFlag(SetupStoreId.GameStory + '.finished.' + storyName, '1')
    useGameStore().currentSceneType = 'map'
    await mapStore.initMap(authStore.userInfo.archive.place)
  }

  return {
    currentStory,
    setCurrentStory,
    getStoryScene,
    getSceneOptions,
    getOptions,
    initStory,
    storyFinished
  }
})
