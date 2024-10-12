import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '../route'
import { clearAuthStorage, getToken, getUserInfo } from './shared'

import useLoading from '@renderer/packages/hooks/use-loading'

import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import {
  createArchive,
  deleteArchive,
  findArchive,
  updateArchive
} from '@renderer/service/api/archive'
import {
  createStorage,
  deleteStorage,
  fetchStorageListByKey,
  findStorage,
  updateStorage
} from '@renderer/service/api/storage'
import { localStg } from '@renderer/utils/storage'
import { useAppStore } from '../app'
import { useGameStore } from '../game'
import { useMapStore } from '../game-map'
import { useStoryStore } from '../game-story'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const appStore = useAppStore()
  const storyStore = useStoryStore()
  const routeStore = useRouteStore()
  const mapStore = useMapStore()
  const gameStore = useGameStore()
  const { redirectFromLogin } = useRouterPush()
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo: Dto.Auth.UserInfo = reactive(getUserInfo())

  const archivedData = ref<Dto.ArchivedData>({
    worldTime: 1697792310000,
    weather: 'sun',
    money: 1000,
    gold: 1,
    items: [],
    relationShip: [],
    achievement: [],
    taskStatus: [],
    flags: []
  })

  const playTime = ref(Date.now())
  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE)
  })

  /** Is login */
  const isLogin = computed(() => Boolean(token.value))

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore()
    authStore.saveArchiveData(false).then(() => {
      clearAuthStorage()
      authStore.$reset()
      if (!route.meta.constant) {
        router.push('/login')
      }
      routeStore.resetStore()
    })
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, id: number | undefined, redirect = true) {
    startLoading()
    // const { data: loginToken, error } = await fetchLogin(userName, password);
    const error = userName == '' || id == undefined
    const loginToken = {
      accessToken: id?.toString()
    } as Dto.Auth.LoginToken

    if (!error) {
      const pass = await loginByToken(loginToken)

      if (pass) {
        await routeStore.initAuthRoute()

        if (redirect) {
          await redirectFromLogin()
        }

        if (routeStore.isInitAuthRoute) {
          playTime.value = Date.now()
          window.$message?.success(
            $t('page.login.common.welcomeBack', { userName: userInfo.username })
          )
        }
      }
    } else {
      resetStore()
    }

    endLoading()
  }

  async function loginByToken(loginToken: Dto.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.accessToken)
    const { data, error } = await findArchive(loginToken.accessToken as unknown as number)
    if (!error) {
      // 2. store archive info
      userInfo.userId = data.id
      userInfo.username = data.name
      userInfo.archive = data
      localStg.set('userInfo', userInfo)
      archivedData.value = JSON.parse(userInfo.archive.data) as Dto.ArchivedData
      // 3. update store
      token.value = data.id == undefined ? '' : data.id.toString()
      // start 初始化数据
      gameStore.initGameData()
      await gameStore.initOptionExecuteRecords()

      if (
        !authStore.checkFlag(
          SetupStoreId.GameStory + '.finished.' + appStore.projectSettings.startStory,
          '1'
        )
      ) {
        gameStore.setSceneType('story')
        await storyStore.setCurrentStory(appStore.projectSettings.startStory)
        setTimeout(() => {
          appStore.projectSettings.startStory = ''
        }, 10)
      } else {
        await mapStore.loadMap(userInfo.archive.place)
      }
      // end
      return true
    }

    return false
  }

  async function saveArchiveData(isNew: boolean) {
    if (isLogin.value) {
      userInfo.archive.totalTime = Math.floor(
        userInfo.archive.totalTime + (Date.now() - playTime.value) / 1000
      )
      userInfo.archive.saveTime = Date.now()
      userInfo.archive.data = JSON.stringify(archivedData.value)
      // 保存当前存档数据
      await saveStorageData(
        SetupStoreId.Game + '.optionExecuteRecords',
        gameStore.optionExecuteRecords
      )
      if (isNew) {
        const searchKey = userInfo.archive.id + '.'
        userInfo.archive.id = undefined
        const newArchive = await createArchive(userInfo.archive)
        userInfo.archive.id = newArchive.data?.id
        const storages = await fetchStorageListByKey(searchKey + '%')
        if (storages.data != null && typeof storages.data != 'string') {
          for (const storage of storages.data) {
            storage.key = storage.key.replace(searchKey, newArchive.data?.id + '.')
            storage.id = undefined
            createStorage(storage)
          }
        }
      } else {
        await updateArchive(userInfo.archive)
      }
    }
  }
  async function findStorageData(key: string) {
    if (userInfo.archive.id != undefined) {
      const searchKey = userInfo.archive.id + '.' + key
      const dataStorage = await findStorage(searchKey)
      return dataStorage
    } else {
      return null
    }
  }

  async function saveStorageData(key: string, data: any) {
    if (userInfo.archive.id != undefined) {
      const searchKey = userInfo.archive.id + '.' + key
      const dataStorage = await findStorage(searchKey)
      if (dataStorage.data != null && typeof dataStorage.data != 'string') {
        dataStorage.data.value = JSON.stringify(data)
        dataStorage.data.updatedTime = Date.now()
        updateStorage(dataStorage.data)
      } else {
        createStorage({
          value: JSON.stringify(data),
          key: searchKey,
          createdTime: Date.now(),
          updatedTime: Date.now()
        })
      }
    }
  }

  async function deleteArchiveData(id: number) {
    const isDel = await deleteArchive(id)
    if (isDel) {
      const storages = await fetchStorageListByKey(id + '.%')
      if (storages.data != null && typeof storages.data != 'string') {
        const ids = storages.data.map((x) => x.id ?? 0)
        await deleteStorage(ids)
      }
    }
  }
  function hasItem(name: string, count: number) {
    if (archivedData.value.items.filter((x) => x.name == name).length > 0) {
      const item = archivedData.value.items.filter((x) => x.name == name)[0]
      return item.count - count >= 0
    }
    return false
  }

  function useItem(name: string, count: number) {
    if (hasItem(name, count)) {
      archivedData.value.items.filter((x) => x.name == name)[0].count -= count
      return true
    } else {
      return false
    }
  }

  function hasFlag(flag: string) {
    if (archivedData.value.flags == undefined) {
      archivedData.value.flags = []
    }
    const flags = archivedData.value.flags.filter((x) => x.key == flag)
    if (flags.length > 0) {
      return flags[0]
    } else {
      return undefined
    }
  }

  function checkFlag(flag: string, value: string) {
    const flagValue = hasFlag(flag)
    if (flagValue != undefined) {
      return flagValue.value == value
    } else {
      return false
    }
  }

  function setFlag(flag: string, value: string) {
    const flagValue = hasFlag(flag)
    if (flagValue != undefined) {
      flagValue.value = value
    } else {
      archivedData.value.flags.push({
        key: flag,
        value
      })
    }
    return true
  }

  return {
    token,
    userInfo,
    archivedData,
    isStaticSuper,
    isLogin,
    loginLoading,
    login,
    saveArchiveData,
    deleteArchiveData,
    resetStore,
    hasItem,
    useItem,
    setFlag,
    checkFlag,
    hasFlag,
    findStorageData,
    saveStorageData
  }
})
