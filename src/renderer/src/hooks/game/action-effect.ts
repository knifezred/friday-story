import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useMapStore } from '@renderer/store/modules/game-map'
import { roomTemperature } from '@renderer/utils/common'

export function useActionEffect() {
  const authStore = useAuthStore()
  const appStore = useAppStore()
  const mapStore = useMapStore()

  // 添加指定物品
  function addItem(value: string) {
    const { 0: name, 1: count } = value.split(',')
    if (authStore.archivedData.items.filter((x) => x.name == name).length > 0) {
      authStore.archivedData.items.filter((x) => x.name == name)[0].count += Number(count)
    } else {
      authStore.archivedData.items.push({
        name: name,
        count: Number(count)
      })
    }
    return {
      name: name,
      count: Number(count)
    }
  }

  // 解锁地图
  function unlockMap(value: string) {
    const map = mapStore.findMap(value)
    if (map != undefined) {
      map.isShow = true
      return true
    }
    return false
  }

  function addFlag(value: string) {
    const { 0: key, 1: flagValue } = value.split(',')
    return authStore.addFlag(key, flagValue)
  }

  function useItem(value: string) {
    const { 0: key, 1: num } = value.split(',')
    return authStore.useItem(key, Number(num))
  }

  function changeRoomTemperature(value: string) {
    if (value.includes(',')) {
      const { 0: key, 1: num } = value.split(',')
      const map = mapStore.findMap(key)
      if (map != undefined) {
        map.temperature = Number(num)
        return true
      }
    } else {
      if (mapStore.currMap.temperature != undefined) {
        mapStore.currMap.temperature = mapStore.currMap.temperature + Number(value)
        appStore.langParams.roomEnv = roomTemperature(mapStore.currMap.temperature)
        return true
      }
    }
    return false
  }

  return {
    addFlag,
    addItem,
    useItem,
    unlockMap,
    changeRoomTemperature
  }
}
