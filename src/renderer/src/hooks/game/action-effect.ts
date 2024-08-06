import { SetupStoreId } from '@renderer/enums'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useGameStore } from '@renderer/store/modules/game'
import { useMapStore } from '@renderer/store/modules/game-map'
import { randomInt, roomTemperature } from '@renderer/utils/common'

export function useActionEffect() {
  const authStore = useAuthStore()
  const gameStore = useGameStore()
  const mapStore = useMapStore()

  // 添加指定物品
  function addItem(value: string) {
    const { 0: name, 1: count } = value.split(',')
    let countNum = 1
    if (count.includes('-')) {
      // 范围
      const { 0: startCount, 1: endCount } = count.split('-')
      countNum = randomInt(Number(startCount), Number(endCount))
    } else {
      countNum = Number(count)
    }
    if (authStore.archivedData.items.filter((x) => x.name == name).length > 0) {
      authStore.archivedData.items.filter((x) => x.name == name)[0].count += countNum
    } else {
      authStore.archivedData.items.push({
        name: name,
        count: countNum
      })
    }
    return {
      success: true,
      val1: name,
      val2: countNum
    }
  }

  // 解锁地图
  function unlockMap(value: string) {
    const map = mapStore.findMap(value)
    if (map != undefined) {
      map.isShow = true
      // 添加地图标识
      addFlag(SetupStoreId.GameMap + '.isShow.' + value + ',1')
      return true
    }
    return false
  }

  // 锁定地图
  function lockMap(value: string) {
    const map = mapStore.findMap(value)
    if (map != undefined) {
      map.isShow = false
      // 添加地图标识
      addFlag(SetupStoreId.GameMap + '.' + value + ',0')
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
        gameStore.langParams.roomEnv = roomTemperature(mapStore.currMap.temperature)
        return true
      }
    }
    return false
  }

  return {
    addFlag,
    addItem,
    useItem,
    lockMap,
    unlockMap,
    changeRoomTemperature
  }
}
