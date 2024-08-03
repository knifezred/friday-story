import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '../app'
import { useAuthStore } from '../auth'

export const useGameStore = defineStore(SetupStoreId.Game, () => {
  const appStore = useAppStore()
  const authStore = useAuthStore()

  const langParams = ref<Game.Env.LangParams>({
    roomEnv: 'coldest',
    playerName: '',
    npc1: '',
    npc2: '',
    value: ''
  })
  const currentScene = ref<Dto.GameScene>({
    name: 'test',
    title: '',
    cover: '/static/stories/start',
    next: '',
    options: [],
    text: []
  })
  const currentSceneType = ref<UnionKey.SceneModule>('map')
  const currentMiniGame = ref<UnionKey.MiniGameModule>('finger-guessing')
  const temperature = ref(-18.0)
  const fromMoney = ref(0)
  const fromGold = ref(0)
  // TODO 存档，根据时间刷新
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

  function changeMusic(src: string) {
    appStore.projectSettings.bgMusic = src
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

  return {
    initOptionExecuteRecords,
    timeUpdate,
    fromMoney,
    fromGold,
    addMoney,
    addGold,
    coastTime,
    currentScene,
    currentSceneType,
    currentMiniGame,
    changeMusic,
    temperature,
    langParams,
    countOptionExecute,
    optionExecuteRecords,
    getOptionExecuteNum
  }
})
