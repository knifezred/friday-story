import { SetupStoreId } from '@renderer/enums/index'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '../route'
import { clearAuthStorage, getToken, getUserInfo } from './shared'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()

  const token = ref(getToken())

  const userInfo: Dto.Auth.UserInfo = reactive(getUserInfo())

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

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    resetStore
  }
})
