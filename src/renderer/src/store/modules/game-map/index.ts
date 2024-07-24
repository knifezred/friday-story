import { SetupStoreId } from '@renderer/enums'
import { checkCondition } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { getDefaultMaps } from './shared'

export const useMapStore = defineStore(SetupStoreId.GameMap, () => {
  const authStore = useAuthStore()
  const allMaps = ref<Array<Dto.MapItemFull>>([])
  const currLevelMaps = ref<Array<Dto.MapItemFull>>([])
  const currMap = ref<Dto.MapItemFull>({
    id: '',
    pid: 'root',
    name: 'test',
    title: 'map.common.test.title',
    text: 'map.common.test.text',
    cover: '/static/map/common/exit.png',
    level: 'room',
    options: []
  })
  const canJumpNext = ref(true)

  function beforeNextMap(map: Dto.MapItemFull) {
    checkConditions(map)
    if (map.id != currMap.value.id || map.next != undefined) {
      let coastTime = 60 * 1000
      if (map.level == 'room') {
        coastTime = coastTime * 5
      }
      if (map.level == 'building') {
        coastTime = coastTime * 15
      }
      if (map.level == 'area') {
        coastTime = coastTime * 40
      }
      if (map.level == 'city') {
        coastTime = coastTime * 60 * 2
      }
      if (map.level == 'country') {
        coastTime = coastTime * 60 * 8
      }
      authStore.archivedData.worldTime += coastTime
      currMap.value = map
      if (map.isLocked != true) {
        canJumpNext.value = true
      } else {
        canJumpNext.value = false
      }
    } else {
      canJumpNext.value = false
    }
  }

  function nextMap(next: string | undefined) {
    debugger
    if (next != undefined) {
      const nextMap = allMaps.value.filter((x) => x.id == next)[0]
      beforeNextMap(nextMap)
      reloadMap(next, currMap.value.pid)
    }
  }

  function checkConditions(map: Dto.MapItemFull) {
    const resultText = checkCondition(map.condition)
    if (resultText == '') {
      map.isLocked = false
    } else {
      map.isLocked = true
    }
  }

  function reloadMap(next: string | undefined, pid: string) {
    if (canJumpNext.value) {
      const nextMap = allMaps.value.filter((x) => x.id == next)[0]
      currLevelMaps.value = allMaps.value.filter((x) => x.pid == nextMap.pid)
      if (next != undefined && next != '') {
        currLevelMaps.value.push({
          id: 'default.exit',
          pid: currLevelMaps.value[0].pid,
          next: nextMap.pid,
          name: 'map.common.exit',
          title: 'map.common.exit.title',
          text: 'map.common.exit.text',
          cover: '/static/map/common/exit.png',
          level: 'room',
          options: []
        })
      }
      if (currLevelMaps.value.length > 0) {
        if (currLevelMaps.value.filter((x) => x.id == pid).length > 0) {
          currMap.value = currLevelMaps.value.filter((x) => x.id == pid)[0]
        } else {
          currMap.value = currLevelMaps.value[0]
        }
      }
    }
    authStore.userInfo.archive.place = currMap.value.id
  }

  function initMap(id: string) {
    allMaps.value = getDefaultMaps()
    const map = allMaps.value.filter((x) => x.id == id)[0]
    if (map.id == id) {
      if (map.next != undefined) {
        currMap.value = map
      } else {
        currMap.value = allMaps.value.filter((x) => x.id == map.pid)[0]
      }
    }
    reloadMap(currMap.value.next, currMap.value.pid)
    // 再次绑定
    currMap.value = allMaps.value.filter((x) => x.id == id)[0]
    authStore.userInfo.archive.place = id
    checkConditions(currMap.value)
  }

  return {
    allMaps,
    currLevelMaps,
    currMap,
    initMap,
    reloadMap,
    beforeNextMap,
    nextMap
  }
})
