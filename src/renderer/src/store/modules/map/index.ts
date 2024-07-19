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
    staticId: 'test',
    title: 'map.common.test.title',
    text: 'map.common.test.text',
    cover: '/static/map/common/exit.png',
    level: 'room',
    actions: []
  })

  function reloadMap(jumpId: number | undefined, pid: number) {
    currLevelMaps.value = allMaps.value.filter((x) => x.pid == jumpId)
    if (jumpId != undefined && jumpId > 0) {
      const upLevel = allMaps.value.filter((x) => x.id == jumpId)[0]
      currLevelMaps.value.push({
        id: 999999,
        pid: currLevelMaps.value[0].pid,
        jumpId: upLevel.pid,
        staticId: 'map.common.exit',
        title: 'map.common.exit.title',
        text: 'map.common.exit.text',
        cover: '/static/map/common/exit.png',
        level: 'room',
        actions: []
      })
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
        map.staticId = 'map.building.' + map.staticId
      } else {
        map.staticId = 'map.' + map.level + '.' + map.staticId
      }
      map.title = map.title ? map.title : map.staticId + '.title'
      map.text = map.text ? map.text : map.staticId + '.text'
      map.cover = map.cover ? map.cover : '/static/' + map.staticId.replaceAll('.', '/') + '.jpeg'
      if (map.id == id) {
        if (map.jumpId != undefined) {
          currMap.value = map
        } else {
          currMap.value = allMaps.value.filter((x) => x.id == map.pid)[0]
        }
      }
    })
    reloadMap(currMap.value.jumpId, currMap.value.pid)
    setTimeout(() => {
      currMap.value = allMaps.value.filter((x) => x.id == id)[0]
    }, 1)
  }
  return {
    allMaps,
    currLevelMaps,
    currMap,
    initMap,
    reloadMap
  }
})
