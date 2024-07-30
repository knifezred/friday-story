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
import { createStorage, deleteStorage, fetchStorageListByKey } from '@renderer/service/api/storage'
import { localStg } from '@renderer/utils/storage'
import { useMapStore } from '../game-map'
export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()
  const mapStore = useMapStore()
  const { redirectFromLogin } = useRouterPush()
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo: Dto.Auth.UserInfo = reactive(getUserInfo())

  const archivedData = ref<Dto.ArchivedData>({
    worldTime: 1600000000000,
    weather: 'sun',
    money: 1000,
    gold: 1,
    items: [],
    relationShip: [],
    achievement: [],
    taskStatus: []
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
            $t('page.login.common.welcomeBack', { userName: userInfo.userName })
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
      userInfo.userName = data.name
      userInfo.archive = data
      localStg.set('userInfo', userInfo)
      archivedData.value = JSON.parse(userInfo.archive.data) as Dto.ArchivedData
      // 3. update store
      token.value = data.id == undefined ? '' : data.id.toString()
      // 初始化地图
      mapStore.initMap(userInfo.archive.place)
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

  function useItem(name: string, count: number) {
    archivedData.value.items.filter((x) => x.name == name)[0].count -= count
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
    useItem
  }
})
