import { DefaultMaps } from '@renderer/constants/data/map'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const useMapStore = defineStore(SetupStoreId.Map, () => {
  const { userInfo } = useAuthStore()
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
    actions: []
  })

  function canJump() {
    return true
  }

  function reloadMap(jumpId: number | undefined, pid: number) {
    currLevelMaps.value = allMaps.value.filter((x) => x.pid == jumpId)
    if (jumpId != undefined && jumpId > 0) {
      if (canJump()) {
        const upLevel = allMaps.value.filter((x) => x.id == jumpId)[0]
        currLevelMaps.value.push({
          id: 0,
          pid: currLevelMaps.value[0].pid,
          jumpId: upLevel.pid,
          name: 'map.common.exit',
          title: 'map.common.exit.title',
          text: 'map.common.exit.text',
          cover: '/static/map/common/exit.png',
          level: 'room',
          actions: []
        })
      }
    }
    if (currLevelMaps.value.length > 0) {
      if (currLevelMaps.value.filter((x) => x.id == pid).length > 0) {
        currMap.value = currLevelMaps.value.filter((x) => x.id == pid)[0]
      } else {
        currMap.value = currLevelMaps.value[0]
      }
      userInfo.archive.place = currMap.value.id
    }
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
        if (map.jumpId != undefined) {
          currMap.value = map
        } else {
          currMap.value = allMaps.value.filter((x) => x.id == map.pid)[0]
        }
      }
    })
    reloadMap(currMap.value.jumpId, currMap.value.pid)
    currMap.value = allMaps.value.filter((x) => x.id == id)[0]
    userInfo.archive.place = id
  }

  return {
    allMaps,
    currLevelMaps,
    currMap,
    initMap,
    reloadMap
  }
})