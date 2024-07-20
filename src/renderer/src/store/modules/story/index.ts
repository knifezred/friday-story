import { DefaultActions } from '@renderer/constants/data/action'
import { DefaultScenes, DefaultStories } from '@renderer/constants/data/story'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoryStore = defineStore(SetupStoreId.Story, () => {
  const currentStory = ref<Dto.StoryPlot>({
    name: 'none',
    type: 'main-line',
    cover: '',
    text: '',
    scenes: []
  })
  function getStoryScenes(sceneNames: string[]) {
    const scenes: Array<Dto.GameScene> = []
    DefaultScenes.forEach((scene) => {
      if (sceneNames.indexOf(scene.name) > -1) {
        scenes.push(scene)
      }
    })
    return scenes
  }
  function setCurrentStory(name: string) {
    currentStory.value = DefaultStories.filter((x) => x.name == name)[0]
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
      item.text = 'stories.' + item.name
      item.cover = '/static/stories/' + item.name.replaceAll('.', '/') + '.jpeg'
    })

    DefaultScenes.forEach((item) => {
      item.text = 'stories.' + item.name + '.text'
      item.title = 'stories.' + item.name + '.title'
      item.cover = '/static/stories/' + item.name.replaceAll('.', '/') + '.jpeg'
    })
  }
  initStory()

  return { currentStory, setCurrentStory, getStoryScenes, getOptions }
})
