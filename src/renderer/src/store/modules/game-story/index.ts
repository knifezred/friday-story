import { DefaultActions } from '@renderer/constants/data/action'
import { SetupStoreId } from '@renderer/enums'
import { parseRenPyScript } from '@renderer/hooks/game/renpy'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { useGameStore } from '../game'
import { useMapStore } from '../game-map'

export const useStoryStore = defineStore(SetupStoreId.GameStory, () => {
  const authStore = useAuthStore()
  const mapStore = useMapStore()
  const gameStore = useGameStore()

  const currentStory = ref<Dto.StoryRenpyScene>({
    name: '',
    scenes: []
  })
  const currentStoryScene = ref<string>('')
  const totalStoryScenes = ref<Array<Dto.StoryRenpyScene>>([])

  function getStoryScene(name: string) {
    const [storyName, next] = name.split('.')
    if (currentStory.value.name != storyName) {
      // 跨story跳转场景
      setCurrentStory(name)
    }
    let nextScene = currentStory.value.scenes.filter((x) => x.name == (next ?? 'start'))[0]
    // 剧情已完结
    if (authStore.checkStoryFinished(name)) {
      nextScene = currentStory.value.scenes.filter((x) => x.name == next + '_end')[0]
      if (nextScene == undefined) {
        // 没有结束场景，直接跳转回地图
        gameStore.setSceneType('map')
      }
    }
    return nextScene
  }

  function getSceneOptions(sceneName: string, menuName: string) {
    return currentStory.value.scenes
      .filter((x) => x.name == sceneName)[0]
      .menus.filter((x) => x.name == menuName)[0].options
  }

  async function setCurrentStory(name: string) {
    const [storyName] = name.split('.')
    currentStory.value = totalStoryScenes.value.find((x) => x.name == storyName) ?? {
      name: '',
      scenes: []
    }
    currentStoryScene.value = name
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
    window.api.listDir('/resources/scripts/story').then((stories) => {
      stories.forEach(async (story) => {
        totalStoryScenes.value.push({
          name: story.replace('.rpy', '').replace('/resources/scripts/story/', ''),
          scenes: await parseRenPyScript(story)
        })
      })
    })
  }

  async function storyFinished(storyName: string) {
    authStore.setStoryFinished(storyName)
    gameStore.setSceneType('map')
    await mapStore.loadMap(authStore.userInfo.archive.place)
  }

  return {
    currentStoryScene,
    setCurrentStory,
    getStoryScene,
    getSceneOptions,
    getOptions,
    initStory,
    storyFinished
  }
})
