// NPC列表
export const DefaultNpcInfoList: Array<Dto.NpcInfo> = [
  {
    name: 'sister',
    username: '奥利维亚',
    nickname: '小奥',
    desc: '煎蛋介绍一下',
    introduce: '',
    age: 22,
    gender: '2',
    identity: 'sister',
    level: 'SSR',
    work: 'collegeStudent',
    relationship: [3, 2, 1]
  },
  {
    name: 'cousin',
    username: '爱莲娜',
    nickname: '小娜',
    desc: '',
    introduce: '',
    age: 18,
    gender: '2',
    identity: 'sister',
    level: 'SR',
    work: 'student',
    relationship: [3, 2, 3],
    isLocked: true
  },
  {
    name: 'wuLuo',
    username: '武罗',
    nickname: '武罗',
    desc: '相传是愚村旁一个大妖、断绝愚村与外界往来',
    introduce: '',
    age: 18,
    gender: '2',
    identity: 'stranger',
    level: 'SSR',
    work: '',
    relationship: [3, 2, 3],
    isLocked: false
  }
]
