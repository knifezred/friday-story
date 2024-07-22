import { useAuthStore } from '@renderer/store/modules/auth'
import dayjs from 'dayjs'

export function useCondition() {
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

  // 是否拥有指定物品
  function hasItem(names: string | string[]) {
    if (typeof names === 'string') {
      return authStore.archivedData.items.filter((x) => x.name == names).length > 0
    }
    return names.some((name) => authStore.archivedData.items.map((x) => x.name).includes(name))
  }

  // 是否在指定时间段内
  function betweenHours(betweens: string) {
    const hours = betweens.split('-')
    const hour = dayjs(authStore.archivedData.worldTime).get('hour')
    if (hour >= Number(hours[0]) || hour < Number(hours[1])) {
      return true
    } else {
      return false
    }
  }

  // 是否在指定的日
  function inDays(days: string) {
    const day = days.split(',')
    const currentDay = dayjs(authStore.archivedData.worldTime).get('day')
    if (day.includes(currentDay.toString())) {
      return true
    }
    return false
  }
  // 是否在指定月份
  function inMons(months: string) {
    const monthsList = months.split(',')
    const currentMonth = dayjs(authStore.archivedData.worldTime).get('month')
    if (monthsList.includes(currentMonth.toString())) {
      return true
    }
    return false
  }
  //是否拥有指定成就
  function hasAchievement(achievement: string) {
    return authStore.archivedData.achievement.includes(achievement)
  }

  return {
    betweenHours,
    hasAuth,
    inDays,
    inMons,
    hasItem,
    hasAchievement
  }
}
