import { DefaultActions } from '@renderer/constants/data/action'
import { DefaultStories } from '@renderer/constants/data/story'
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
    script: ''
  })

  const authStore = useAuthStore()
  const mapStore = useMapStore()

  const currentStoryScenes = ref<Array<Dto.RenPyScene>>([])
  const totalStoryScenes = ref<Array<Dto.StoryRenpyScene>>([])

  function getStoryScene(sceneName: string) {
    if (sceneName == null) {
      sceneName = 'start'
    }
    return currentStoryScenes.value.filter((x) => x.name == sceneName)[0]
  }

  function getSceneOptions(sceneName: string, menuName: string) {
    return currentStoryScenes.value
      .filter((x) => x.name == sceneName)[0]
      .menus.filter((x) => x.name == menuName)[0].options
  }

  async function setCurrentStory(name: string) {
    const [storyName, nextScene] = name.split('.')
    const story = DefaultStories.find((x) => x.name === storyName)
    if (story) {
      currentStory.value = story
      const storyScene = totalStoryScenes.value.find((x) => x.name == currentStory.value.name)
      if (storyScene) {
        currentStoryScenes.value = storyScene.scenes
      } else {
        currentStoryScenes.value = []
      }
      currentStory.value.nextScene = nextScene
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
    DefaultStories.forEach(async (item) => {
      const localizationText = localeText(item.text, item.name, 'stories', '')
      item.text = [localizationText]
      item.cover = prefixImage(item.cover, item.name, 'stories', '')
      totalStoryScenes.value.push({
        name: item.name,
        scenes: await parseRenPyScript(item.script)
      })
    })
  }

  async function storyFinished(storyName: string) {
    authStore.setFlag(SetupStoreId.GameStory + '.finished.' + storyName, '1')
    useGameStore().sceneType = 'map'
    await mapStore.loadMap(authStore.userInfo.archive.place)
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
