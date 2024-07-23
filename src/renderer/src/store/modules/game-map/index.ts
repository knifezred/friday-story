import { DefaultMaps } from '@renderer/constants/data/map'
import { SetupStoreId } from '@renderer/enums'
import { checkCondition, localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const useMapStore = defineStore(SetupStoreId.GameMap, () => {
  const authStore = useAuthStore()
  const allMaps = ref<Array<Dto.MapItem>>(DefaultMaps)
  const currLevelMaps = ref<Array<Dto.MapItem>>([])
  const currMap = ref<Dto.MapItem>({
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

  function beforeNextMap(map: Dto.MapItem) {
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

  function checkConditions(map: Dto.MapItem) {
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
    allMaps.value.forEach((map) => {
      let typeName = map.level + '.' + map.name
      if (map.level == 'room') {
        typeName = 'building.' + map.name
      }
      map.text = localeText(map.text, typeName, 'map', 'text').toString()
      map.title = localeText(map.title, typeName, 'map', 'title').toString()
      map.cover = prefixImage(map.cover, typeName, 'map', '.jpeg')
      if (map.id == id) {
        if (map.nextId != undefined) {
          currMap.value = map
        } else {
          currMap.value = allMaps.value.filter((x) => x.id == map.pid)[0]
        }
      }
    })
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
    beforeNextMap
  }
})
