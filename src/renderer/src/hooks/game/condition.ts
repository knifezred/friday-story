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
      return authStore.archivedData.items.filter((x) => x.name == names).length > 0
    }
    return names.some((name) => authStore.archivedData.items.map((x) => x.name).includes(name))
  }

  function hasLocked() {
    if (appStore.currentSceneType == 'map') {
      return mapStore.currMap.isLocked == true
    }
    return false
  }

  function inTime(betweens: string) {
    const times = betweens.split('-')
    const [hours, minutes] = times[0].split(':').map(Number)
    const startTime = hours * 60 + minutes
    const [endHours, endMinutes] = times[1].split(':').map(Number)
    const endTime = endHours * 60 + endMinutes
    const currentHour = dayjs(authStore.archivedData.worldTime).get('hour')
    const currentMinute = dayjs(authStore.archivedData.worldTime).get('minute')
    const currentTime = currentHour * 60 + currentMinute
    if (startTime > endTime) {
      // 跨天
      if (currentTime >= endTime || currentTime < startTime) {
        return true
      } else {
        return false
      }
    } else {
      // 不跨天
      if (currentTime >= startTime && currentTime < endTime) {
        return true
      } else {
        return false
      }
    }
  }

  function inHour(hours: string) {
    return inSpecifiedTime(hours, 'hour')
  }

  // 是否在指定的日期
  function inDays(days: string) {
    return inSpecifiedTime(days, 'day')
  }

  // 是否在指定月份
  function inMons(months: string) {
    return inSpecifiedTime(months, 'month')
  }

  // 是否在指定时间段内
  function inSpecifiedTime(time: string, type: 'day' | 'month' | 'hour') {
    const times = time.split(',')
    const current = dayjs(authStore.archivedData.worldTime).get(type).toString()
    if (times.includes(current)) {
      return true
    }
    return false
  }

  return {
    hasAuth,
    hasItem,
    hasAchievement,
    hasLocked,
    inTime,
    inHour,
    inDays,
    inMons
  }
}
