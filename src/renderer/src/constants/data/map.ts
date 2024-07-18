// title=map.${staticId}.title
// text=map.${staticId}.text
// cover=/static/map/${staticId.replace('.','/')}.jpeg
// ## 判断条件
// 时间（间隔天数，星期几，几号，几月）
// 位置（房间id）
// 角色属性
// 人物关系
// 配置
// room house street area city country
export const DefaultMaps: Array<Dto.MapItem> = [
  {
    id: 1,
    pid: 0,
    jumpId: 1,
    staticId: 'country.friday',
    title: '',
    text: '',
    cover: '',
    level: 'country'
  },
  {
    id: 2,
    pid: 1,
    jumpId: 2,
    staticId: 'city.boot',
    title: '',
    text: '',
    cover: '',
    level: 'city'
  },
  {
    id: 3,
    pid: 2,
    jumpId: 3,
    staticId: 'area.dongshan',
    title: '',
    text: '',
    cover: '',
    level: 'area'
  },
  {
    id: 4,
    pid: 3,
    jumpId: 4,
    staticId: 'street.pingan',
    title: '',
    text: '',
    cover: '',
    level: 'street'
  },
  {
    id: 5,
    pid: 4,
    jumpId: 5,
    staticId: 'home.home',
    title: '',
    text: '',
    cover: '',
    level: 'house'
  },
  {
    id: 6,
    pid: 5,
    staticId: 'home.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 7,
    pid: 5,
    staticId: 'home.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 8,
    pid: 5,
    staticId: 'home.room_player',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 9,
    pid: 5,
    staticId: 'home.room_sister',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 10,
    pid: 5,
    staticId: 'home.room_cousin',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 11,
    pid: 5,
    staticId: 'home.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 12,
    pid: 5,
    staticId: 'home.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 13,
    pid: 5,
    jumpId: 4,
    staticId: 'home.door',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 14,
    pid: 4,
    jumpId: 14,
    staticId: 'house_lin.home',
    title: '',
    text: '',
    cover: '',
    level: 'house'
  },
  {
    id: 15,
    pid: 14,
    staticId: 'house_lin.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 16,
    pid: 14,
    staticId: 'house_lin.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 17,
    pid: 14,
    staticId: 'house_lin.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 18,
    pid: 14,
    staticId: 'house_lin.lin_room',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 19,
    pid: 14,
    staticId: 'house_lin.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 20,
    pid: 14,
    jumpId: 4,
    staticId: 'house_lin.door',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 21,
    pid: 4,
    staticId: 'street.entrance',
    title: '',
    text: '',
    cover: '',
    level: 'street'
  },
  {
    id: 22,
    pid: 3,
    staticId: 'city.c01',
    title: '',
    text: '',
    cover: '',
    level: 'city'
  },
  {
    id: 23,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 23,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 247,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 25,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 26,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 27,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 28,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 29,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  },
  {
    id: 30,
    pid: 3,
    staticId: '',
    title: '',
    text: '',
    cover: '',
    level: 'room'
  }
]
