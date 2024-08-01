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
  const currentSceneType = ref<UnionKey.SceneModule>('map')
  const currentMiniGame = ref<UnionKey.MiniGameModule>('finger-guessing')
  const temperature = ref(-18.0)
  const fromMoney = ref(0)
  const fromGold = ref(0)
  // TODO 存档，根据时间刷新
  const optionExecuteNumbers = ref<Array<Game.ActionOption.ActionExecuteNumber>>([])

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
    const option = optionExecuteNumbers.value.filter((x) => x.name == name)
    if (option.length > 0) {
      option[0].num += 1
    } else {
      optionExecuteNumbers.value.push({
        name,
        num: 1
      })
    }
  }

  function getOptionExecuteNum(name: string) {
    const option = optionExecuteNumbers.value.filter((x) => x.name == name)
    if (option.length > 0) {
      return option[0].num
    } else {
      return 0
    }
  }
  function timeUpdate() {
    console.log()
  }

  return {
    timeUpdate,
    fromMoney,
    fromGold,
    addMoney,
    addGold,
    coastTime,
    currentSceneType,
    currentMiniGame,
    changeMusic,
    temperature,
    langParams,
    countOptionExecute,
    getOptionExecuteNum
  }
})
