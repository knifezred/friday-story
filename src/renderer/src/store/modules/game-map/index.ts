import { DefaultMaps } from '@renderer/constants/data/map'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const useMapStore = defineStore(SetupStoreId.GameMap, () => {
  const authStore = useAuthStore()
  const allMaps = ref<Array<Dto.MapItemFull>>([])
  const currLevelMaps = ref<Array<Dto.MapItemFull>>([])
  const currMap = ref<Dto.MapItemFull>({
    id: 0,
    pid: 0,
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
    if (map.id != currMap.value.id || map.nextId != undefined) {
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

  function nextMap(nextId: string | undefined) {
    if (nextId != undefined) {
      const nextMapId = Number(nextId)
      const nextMap = allMaps.value.filter((x) => x.id == nextMapId)[0]
      beforeNextMap(nextMap)
      reloadMap(nextMapId, currMap.value.pid)
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

  function reloadMap(nextId: number | undefined, pid: number) {
    if (canJumpNext.value) {
      currLevelMaps.value = allMaps.value.filter((x) => x.pid == nextId)
      if (nextId != undefined && nextId > 0) {
        const upLevel = allMaps.value.filter((x) => x.id == nextId)[0]
        currLevelMaps.value.push({
          id: 0,
          pid: currLevelMaps.value[0].pid,
          nextId: upLevel.pid,
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

  function initMap(id: number) {
    allMaps.value = []
    for (const map of DefaultMaps) {
      let typeName = map.level + '.' + map.name
      if (map.level == 'room') {
        typeName = 'building.' + map.name
      }
      const fullMap = {
        ...map,
        title: localeText('', typeName, 'map', 'title').toString(),
        text: localeText('', typeName, 'map', 'text').toString(),
        cover: prefixImage('', typeName, 'map', '.jpeg')
      }
      allMaps.value.push(fullMap)
      if (map.id == id) {
        if (map.nextId != undefined) {
          currMap.value = fullMap
        } else {
          currMap.value = allMaps.value.filter((x) => x.id == map.pid)[0]
        }
      }
    }
    reloadMap(currMap.value.nextId, currMap.value.pid)
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
