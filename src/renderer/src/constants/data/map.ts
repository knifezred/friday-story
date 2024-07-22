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
    nextId: 1,
    name: 'friday',
    title: '',
    text: '',
    cover: '',
    level: 'country',
    options: []
  },
  {
    id: 2,
    pid: 1,
    nextId: 2,
    name: 'boot',
    title: '',
    text: '',
    cover: '',
    level: 'city',
    options: []
  },
  {
    id: 3,
    pid: 2,
    nextId: 3,
    name: 'dongshan',
    title: '',
    text: '',
    cover: '',
    level: 'area',
    options: []
  },
  {
    id: 4,
    pid: 3,
    nextId: 4,
    name: 'pingan',
    title: '',
    text: '',
    cover: '',
    level: 'street',
    options: []
  },
  {
    id: 5,
    pid: 4,
    nextId: 5,
    name: 'home',
    title: '',
    text: '',
    cover: '',
    level: 'building',
    options: []
  },
  {
    id: 6,
    pid: 5,
    name: 'home.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 7,
    pid: 5,
    name: 'home.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 8,
    pid: 5,
    name: 'home.room_player',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 9,
    pid: 5,
    name: 'home.room_sister',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 10,
    pid: 5,
    name: 'home.room_cousin',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 11,
    pid: 5,
    name: 'home.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 12,
    pid: 5,
    name: 'home.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 13,
    pid: 5,
    nextId: 4,
    name: 'home.door',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 14,
    pid: 4,
    nextId: 14,
    name: 'house_lin',
    title: '',
    text: '',
    cover: '',
    level: 'building',
    options: ['finger-guessing', 'dice-number'],
    isLocked: true,
    conditions: 'hasItem.10'
  },
  {
    id: 15,
    pid: 14,
    name: 'house_lin.living_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 16,
    pid: 14,
    name: 'house_lin.bedroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 17,
    pid: 14,
    name: 'house_lin.kitchen',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 18,
    pid: 14,
    name: 'house_lin.lin_room',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 19,
    pid: 14,
    name: 'house_lin.bathroom',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 20,
    pid: 14,
    nextId: 4,
    name: 'house_lin.door',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 21,
    pid: 4,
    name: 'happy_shop',
    title: '',
    text: '',
    cover: '.png',
    level: 'building',
    options: ['shop', 'scene.start'],
    conditions: 'betweenHours.22-9'
  },
  {
    id: 22,
    pid: 3,
    name: 'backstreet',
    title: '',
    text: '',
    cover: '',
    level: 'street',
    options: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 247,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 25,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 26,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 27,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 28,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 29,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  },
  {
    id: 30,
    pid: 3,
    name: 'demo',
    title: '',
    text: '',
    cover: '',
    level: 'room',
    options: []
  }
]
