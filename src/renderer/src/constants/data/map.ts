// title=map.${name}.title
// text=map.${name}.text
// cover=/static/map/${name.replace('.','/')}.jpeg
// ## 判断条件
// 时间（间隔天数，星期几，几号，几月）
// 位置（房间id）
// 角色属性
// 人物关系
// 配置

export const DefaultMaps: Array<Dto.MapItem> = [
  {
    id: 1,
    pid: 0,
    jumpId: 1,
    name: 'friday',
    title: '',
    text: '',
    cover: '',
    level: 'country',
    actions: []
  },
  {
    id: 2,
    pid: 1,
    jumpId: 2,
    name: 'boot',
    title: '',
    text: '',
    cover: '',
    level: 'city',
    actions: []
  },
  {
    id: 3,
    pid: 2,
    jumpId: 3,
    name: 'dongshan',
    title: '',
    text: '',
    cover: '',
    level: 'area',
    actions: []
  },
  {
    id: 4,
    pid: 3,
    jumpId: 4,
    name: 'pingan',
    title: '',
    text: '',
    cover: '',
    level: 'street',
    actions: []
  },
  {
    id: 5,
    pid: 4,
    jumpId: 5,
    name: 'home',
    title: '',
    text: '',
    cover: '',
    level: 'building',
    actions: []
  },
  {
    id: 6,
    pid: 5,
    name: 'home.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 7,
    pid: 5,
    name: 'home.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 8,
    pid: 5,
    name: 'home.room_player',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 9,
    pid: 5,
    name: 'home.room_sister',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 10,
    pid: 5,
    name: 'home.room_cousin',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 11,
    pid: 5,
    name: 'home.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 12,
    pid: 5,
    name: 'home.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 13,
    pid: 5,
    jumpId: 4,
    name: 'home.door',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 14,
    pid: 4,
    jumpId: 14,
    name: 'house_lin',
    title: '',
    text: '',
    cover: '',
    level: 'building',
    actions: [],
    isLocked: true,
    lockedReason: 'locked_door'
  },
  {
    id: 15,
    pid: 14,
    name: 'house_lin.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 16,
    pid: 14,
    name: 'house_lin.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 17,
    pid: 14,
    name: 'house_lin.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 18,
    pid: 14,
    name: 'house_lin.lin_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 19,
    pid: 14,
    name: 'house_lin.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 20,
    pid: 14,
    jumpId: 4,
    name: 'house_lin.door',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 21,
    pid: 4,
    name: 'happy_shop',
    title: '',
    text: '',
    cover: '.png',
    level: 'building',
    actions: [3]
  },
  {
    id: 22,
    pid: 3,
    name: 'backstreet',
    title: '',
    text: '',
    cover: '',
    level: 'street',
    actions: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 247,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 25,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 26,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 27,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 28,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 29,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  },
  {
    id: 30,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    actions: []
  }
]
