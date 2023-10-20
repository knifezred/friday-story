export interface Room {
  id: number
  pid: string
  bg?: string
  name?: string
  empty?: boolean
}
export const AllRooms: Room[] = [
  {
    id: 1,
    pid: '8',
    bg: '../src/assets/imgs/test.jpg',
    name: '家',
    empty: true
  },
  {
    id: 2,
    pid: '1,2,3,4,5,6,7',
    bg: '../src/assets/imgs/test.jpg',
    name: '卧室',
    empty: true
  },
  {
    id: 3,
    pid: '1,2,3,4,5,6,7',
    bg: '../src/assets/imgs/test.jpg',
    name: '客厅',
    empty: true
  },
  {
    id: 4,
    pid: '1,2,3,4,5,6,7',
    bg: '../src/assets/imgs/test.jpg',
    name: '浴室',
    empty: true
  },
  {
    id: 5,
    pid: '1,2,3,4,5,6,7,',
    bg: '../src/assets/imgs/test.jpg',
    name: '露台',
    empty: true
  },
  {
    id: 8,
    pid: '1,2,3,4,5,6,7,9',
    bg: '../src/assets/imgs/test.jpg',
    name: '街道',
    empty: true
  },
  {
    id: 9,
    pid: '8',
    bg: '../src/assets/imgs/test.jpg',
    name: '大学',
    empty: true
  }
]
