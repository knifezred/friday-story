import { useAuthStore } from '@renderer/store/modules/auth'
import dayjs from 'dayjs'

export function useActionCondition() {
  const authStore = useAuthStore()

  function hasAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.buttons.includes(codes)
    }

    return codes.some((code) => authStore.userInfo.buttons.includes(code))
  }

  function hasItem(ids: string | string[]) {
    if (typeof ids === 'string') {
      return authStore.archivedData.items.filter((x) => x.id == Number(ids)).length > 0
    }
    return ids.some((id) => authStore.archivedData.items.map((x) => x.id).includes(Number(id)))
  }

  function lockedHours(betweens: string) {
    const hours = betweens.split('-')
    const hour = dayjs(authStore.archivedData.worldTime).get('hour')
    if (hour > Number(hours[0]) || hour < Number(hours[1])) {
      return true
    } else {
      return false
    }
  }
  return {
    hasAuth,
    hasItem,
    lockedHours
  }
}
