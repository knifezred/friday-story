import { DefaultAchievements } from '@renderer/constants/data/achievement'
import { SetupStoreId } from '@renderer/enums'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '../app'
import { useAuthStore } from '../auth'
import { useGameItemStore } from '../game-item'
import { useMapStore } from '../game-map'
import { useNpcStore } from '../game-npc'
import { useStoryStore } from '../game-story'

export const useGameStore = defineStore(SetupStoreId.Game, () => {
  const appStore = useAppStore()
  const authStore = useAuthStore()
  const storyStore = useStoryStore()
  const npcStore = useNpcStore()
  const mapStore = useMapStore()
  const itemStore = useGameItemStore()

  const langParams = ref<Game.Env.LangParams>({
    roomEnv: 'coldest',
    playerName: '',
    npc1: '',
    npc2: '',
    value: ''
  })
  const textInterpolation = ref<Game.Env.Interpolation>({
    me: undefined,
    npc: {}
  })
  function initTextInterpolation() {
    textInterpolation.value.me = authStore.userInfo
    const npc = {}
    npcStore.allNPCs.forEach((item) => {
      npc[item.name] = item
    })
    textInterpolation.value.npc = npc
  }
  const currentScene = ref<Dto.GameScene>({
    name: 'test',
    title: '',
    cover: '/resources/stories/start',
    next: '',
    options: [],
    text: []
  })
  const renpyScene = ref<Dto.RenPyScene>({
    name: '',
    cover: '',
    next: '',
    text: [],
    menus: []
  })
  const sceneType = ref<UnionKey.SceneModule>('map')
  function setSceneType(key: UnionKey.SceneModule) {
    sceneType.value = key
  }
  const currentMiniGame = ref<UnionKey.MiniGameModule>('finger-guessing')
  const temperature = ref(-18.0)
  const fromMoney = ref(0)
  const fromGold = ref(0)

  const achievementList = ref<Array<Dto.AchievementModel>>(DefaultAchievements)
  function getAchievements() {
    const list: Array<Dto.AchievementModel> = []
    DefaultAchievements.forEach((item) => {
      item.title = localeText(item.title, item.name, 'game.achievement', 'title')
      item.desc = localeText(item.desc, item.name, 'game.achievement', 'desc')
      item.cover = prefixImage(item.cover, item.name, 'achievement', '')
      console.log(item.title)
      list.push(item)
    })
    return list
  }

  const optionExecuteRecords = ref<Array<Dto.KeyValueNumPair>>([])

  function addMoney(money: number) {
    fromMoney.value = authStore.archivedData.money
    authStore.archivedData.money = authStore.archivedData.money + money
  }
  function addGold(gold: number) {
    fromGold.value = authStore.archivedData.gold
    authStore.archivedData.gold = authStore.archivedData.gold + gold
  }

  function coastTime(minutes: number) {
    authStore.archivedData.worldTime += minutes * 60 * 1000
  }

  function playMusic(src: string) {
    appStore.projectSettings.music = src
  }

  function playVoice(src: string) {
    appStore.projectSettings.voice = src
  }
  function playSound(src: string) {
    appStore.projectSettings.sound = src
  }

  function countOptionExecute(name: string) {
    const option = optionExecuteRecords.value.filter((x) => x.key == name)
    if (option.length > 0) {
      option[0].value += 1
    } else {
      optionExecuteRecords.value.push({
        key: name,
        value: 1
      })
    }
  }

  function getOptionExecuteNum(name: string) {
    const option = optionExecuteRecords.value.filter((x) => x.key == name)
    if (option.length > 0) {
      return option[0].value
    } else {
      return 0
    }
  }

  async function initOptionExecuteRecords() {
    const temp = await authStore.findStorageData(SetupStoreId.Game + '.optionExecuteRecords')
    if (temp != null && temp.data != null && typeof temp.data != 'string') {
      optionExecuteRecords.value = JSON.parse(temp.data.value) as Array<Dto.KeyValueNumPair>
    }
  }

  function timeUpdate() {
    console.log()
  }

  function initGameData() {
    itemStore.initTotalGameItems()
    mapStore.initMaps()
    storyStore.initStory()
    npcStore.initNpc()
  }
  return {
    initOptionExecuteRecords,
    timeUpdate,
    fromMoney,
    fromGold,
    addMoney,
    addGold,
    coastTime,
    renpyScene,
    currentScene,
    sceneType,
    setSceneType,
    currentMiniGame,
    playMusic,
    playSound,
    playVoice,
    temperature,
    langParams,
    countOptionExecute,
    optionExecuteRecords,
    getOptionExecuteNum,
    achievementList,
    getAchievements,
    textInterpolation,
    initTextInterpolation,
    initGameData
  }
})
