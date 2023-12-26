import { Room } from './entities'

export const AllRooms: Room[] = [
  {
    id: 0,
    pid: '',
    bg: '/imgs/t0.webp',
    name: '创建人物',
    description: '创建人物 test',
    empty: true
  },
  {
    id: 1,
    pid: '0,8',
    bg: '/imgs/t7.webp',
    name: '家',
    description: 'test go home',
    empty: true
  },
  {
    id: 2,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/t1.webp',
    name: '卧室',
    description: 'test go 卧室',
    empty: true
  },
  {
    id: 3,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/t2.webp',
    name: '主卧',
    description: 'test go 主卧',
    empty: true
  },
  {
    id: 4,
    pid: '1,2,3,4,5,6,7',
    bg: '/imgs/t3.webp',
    name: '次卧',
    description: 'test go 次卧',
    empty: true
  },
  {
    id: 5,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/t4.webp',
    name: '卫生间',
    empty: true
  },
  {
    id: 6,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/t5.webp',
    name: '客厅',
    empty: true
  },
  {
    id: 7,
    pid: '1,2,3,4,5,6,7,',
    bg: '/imgs/t6.webp',
    name: '餐厅',
    empty: true
  },
  {
    id: 8,
    pid: '0,1,2,3,4,5,6,7,9',
    bg: '/imgs/street001.jpg',
    name: '街道',
    empty: true
  },
  {
    id: 9,
    pid: '8',
    bg: '/imgs/t8.webp',
    name: '大学',
    empty: true
  }
]
