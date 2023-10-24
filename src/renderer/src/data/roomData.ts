export interface Room {
  id: number
  pid: string
  bg?: string
  name?: string
  description?: string
  media?: string
  empty?: boolean
}
export const AllRooms: Room[] = [
  {
    id: 1,
    pid: '8',
    bg: '/imgs/room001.jpg',
    name: '家',
    description: 'test go home',
    empty: true
  },
  {
    id: 2,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/room001.jpg',
    name: '卧室',
    description: 'test go 卧室',
    empty: true
  },
  {
    id: 3,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/th.jpg',
    name: '主卧',
    description: 'test go 主卧',
    empty: true
  },
  {
    id: 4,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/room001.jpg',
    name: '次卧',
    description: 'test go 次卧',
    empty: true
  },
  {
    id: 5,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/room001.jpg',
    name: '卫生间',
    empty: true
  },
  {
    id: 6,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/room001.jpg',
    name: '客厅',
    empty: true
  },
  {
    id: 7,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/room001.jpg',
    name: '餐厅',
    empty: true
  },
  {
    id: 8,
    pid: '1,2,3,4,5,6,7,9',
    bg: '/imgs/room001.jpg',
    name: '街道',
    empty: true
  },
  {
    id: 9,
    pid: '8',
    bg: '/imgs/room001.jpg',
    name: '大学',
    empty: true
  }
]
