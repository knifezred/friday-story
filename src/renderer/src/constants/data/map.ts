// 地图列表
export const DefaultMaps: Array<Dto.MapItem> = [
  {
    id: 1,
    title: 'map.home.title',
    text: 'map.home.text',
    cover: '/static/map/base_home/door.jpeg',
    video: '',
    icon: '',
    isDisabled: false,
    level: 1,
    pid: 0,
    jumpId: 1
  },
  {
    id: 2,
    title: 'map.home.living_room.title',
    text: 'map.home.living_room.text',
    cover: '/static/map/base_home/living_room.jpeg',
    video: '',
    icon: '',
    isDisabled: false,
    level: 2,
    pid: 1
  },
  {
    id: 3,
    title: 'map.home.bedroom.title',
    text: 'map.home.bedroom.text',
    cover: '/static/map/base_home/bedroom.jpeg',
    isDisabled: false,
    level: 2,
    pid: 1
  },
  {
    id: 4,
    title: 'map.home.room_player.title',
    text: 'map.home.room_player.text',
    cover: '/static/map/base_home/room_player.jpeg',
    level: 2,
    pid: 1
  },
  {
    id: 5,
    title: 'map.home.room_sister.title',
    text: 'map.home.room_sister.text',
    cover: '/static/map/base_home/room_sister.jpeg',
    level: 2,
    pid: 1
  },
  {
    id: 6,
    title: 'map.home.room_cousin.title',
    text: 'map.home.room_cousin.text',
    cover: '/static/map/base_home/room_cousin.jpeg',
    level: 2,
    pid: 1
  },
  {
    id: 7,
    title: 'map.home.door.title',
    text: 'map.home.door.text',
    cover: '/static/map/base_home/door.jpeg',
    level: 2,
    pid: 1,
    jumpId: 0
  }
]
