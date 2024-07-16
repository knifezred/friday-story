// 地图列表
export const DefaultMaps: Array<Dto.MapItem> = [
  {
    id: 1,
    title: 'map.title.title1',
    text: 'map.text.text1',
    cover: '/static/imgs/t8.webp',
    video: '',
    icon: '',
    isDisabled: false,
    isShow: false,
    level: 1,
    pid: 0,
    jumpId: 1
  },
  {
    id: 2,
    title: 'map.title.title2',
    text: 'map.text.text2',
    cover: '/static/imgs/t2.webp',
    video: '',
    icon: '',
    isDisabled: false,
    isShow: false,
    level: 2,
    pid: 1
  },
  {
    id: 3,
    title: 'map.title.title3',
    text: 'map.text.text3',
    cover: '/static/imgs/t3.webp',
    video: '',
    icon: '',
    isDisabled: false,
    isShow: false,
    level: 2,
    pid: 1
  },
  {
    id: 4,
    title: 'map.title.title4',
    text: 'map.text.text4',
    cover: '/static/imgs/t4.webp',
    video: '',
    icon: '',
    isDisabled: false,
    isShow: false,
    level: 2,
    pid: 1,
    jumpId: 0
  }
]
// NPC列表
export const DefaultNpcInfoList: Array<Dto.NpcInfo> = [
  {
    id: 1,
    name: '张三',
    desc: '法外狂徒',
    introduce: '暂无介绍',
    avatar: '/static/imgs/avatar/man-002.svg',
    staticPath: 'zhangsan',
    age: 28,
    gender: '1',
    relationship: [3, 2, 1],
    relationshipWithPlayer: '',
    level: 'SSR',
    isLocked: false
  },
  {
    id: 2,
    name: '李四',
    desc: '耕田的',
    introduce: '暂无介绍',
    avatar: '/static/imgs/avatar/man-003.svg',
    staticPath: 'lisi',
    age: 30,
    gender: '1',
    relationship: [3, 2, 3],
    relationshipWithPlayer: '',
    level: 'SR',
    isLocked: true
  }
]
