import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useMapStore } from '@renderer/store/modules/game-map'
import dayjs from 'dayjs'

export function useCondition() {
  const authStore = useAuthStore()
  const appStore = useAppStore()
  const mapStore = useMapStore()

  function hasAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.buttons.includes(codes)
    }

    return codes.some((code) => authStore.userInfo.buttons.includes(code))
  }

  //是否拥有指定成就
  function hasAchievement(achievement: string) {
    return authStore.archivedData.achievement.includes(achievement)
  }

  // 是否拥有指定物品
  function hasItem(names: string | string[]) {
    if (typeof names === 'string') {
      return authStore.archivedData.items.filter((x) => 'items.' + x.name == names).length > 0
    }
    return names.some((name) =>
      authStore.archivedData.items.map((x) => 'items.' + x.name).includes(name)
    )
  }

  function hasLocked() {
    if (appStore.currentSceneType == 'map') {
      return mapStore.currMap.isLocked == true
    }
    return false
  }
  // 是否在指定时间段内
  function betweenHours(betweens: string) {
    const hours = betweens.split('-')
    const minHour = Number(hours[0])
    const maxHour = Number(hours[1])
    const hour = dayjs(authStore.archivedData.worldTime).get('hour')
    if (minHour > maxHour) {
      // 跨天
      if (hour >= maxHour || hour < minHour) {
        return true
      } else {
        return false
      }
    } else {
      // 不跨天
      if (hour >= minHour && hour < maxHour) {
        return true
      } else {
        return false
      }
    }
  }

  // 是否在指定的日期
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

  return {
    betweenHours,
    hasAuth,
    inDays,
    inMons,
    hasItem,
    hasAchievement,
    hasLocked
  }
}
