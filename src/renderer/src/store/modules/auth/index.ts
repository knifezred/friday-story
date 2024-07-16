import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '../route'
import { clearAuthStorage, getToken, getUserInfo } from './shared'

import useLoading from '@renderer/packages/hooks/use-loading'

import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { findArchive } from '@renderer/service/api/archive'
import { localStg } from '@renderer/utils/storage'
export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()
  const { redirectFromLogin } = useRouterPush()
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo: Dto.Auth.UserInfo = reactive(getUserInfo())

  const startTime = ref(0)
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

    clearAuthStorage()

    authStore.$reset()
    if (!route.meta.constant) {
      router.push('/login')
    }

    routeStore.resetStore()
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
          startTime.value = Date.now()
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
      // 3. update store
      token.value = data.id == undefined ? '' : data.id.toString()
      return true
    }

    return false
  }
  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    login,
    resetStore
  }
})
