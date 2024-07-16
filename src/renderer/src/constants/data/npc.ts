// NPC列表
export const DefaultNpcInfoList: Array<Dto.NpcInfo> = [
  {
    id: 1,
    name: '林乐清',
    desc: '主角的姐姐',
    introduce: '暂无介绍',
    avatar: '/static/npc/sister/avatar.jpeg',
    staticPath: 'sister',
    age: 28,
    gender: '1',
    relationship: [3, 2, 1],
    relationshipWithPlayer: '姐姐',
    level: 'SSR',
    isLocked: false
  },
  {
    id: 2,
    name: '林乐茹',
    desc: '主角的表妹，借宿在主角家中',
    introduce: '暂无介绍',
    avatar: '/static/npc/cousin/avatar.jpeg',
    staticPath: 'cousin',
    age: 30,
    gender: '1',
    relationship: [3, 2, 3],
    relationshipWithPlayer: '表妹',
    level: 'SR',
    isLocked: false
  }
]
