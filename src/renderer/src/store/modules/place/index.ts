import { DefaultMaps } from '@renderer/constants/data/map'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const usePlaceStore = defineStore(SetupStoreId.Place, () => {
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
    canJumpNext.value = map.isLocked != true
    if (!canJumpNext.value) {
      currMap.value = map
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
      if (map.level == 'room') {
        map.name = 'map.building.' + map.name
      } else {
        map.name = 'map.' + map.level + '.' + map.name
      }
      map.title = map.title ? map.title : map.name + '.title'
      map.text = map.text ? map.text : map.name + '.text'
      if (map.cover.startsWith('.')) {
        map.cover = '/static/' + map.name.replaceAll('.', '/') + map.cover
      } else {
        map.cover = map.cover ? map.cover : '/static/' + map.name.replaceAll('.', '/') + '.jpeg'
      }
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
