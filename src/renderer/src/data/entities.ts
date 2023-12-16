import Dexie, { Table } from 'dexie'
export interface Character {
  id: number
  avatar?: string
  name?: string
  title?: string
  job?: string
  age?: number
}

export interface StoryAction {
  id: number
  title: string
  value: string
  function: string
  story?: string
  room?: number
}

export interface Story {
  id: number
  content: string
  media: string
  nextId: number
}
// 房间
export interface Room {
  id: number
  pid: string
  bg?: string
  name?: string
  description?: string
  media?: string
  empty?: boolean
  hidden?: boolean
}

export class DbDexie extends Dexie {
  character!: Table<Character>
  rooms!: Table<Room>
  stories!: Table<Story>
  storyActions!: Table<StoryAction>
  constructor(dbName: string) {
    super(dbName)
    this.version(1).stores({
      character: '++id, name, avatar, title, job, age',
      rooms: 'id, '
    })
  }
}

export function connDb(dbName: string): DbDexie {
  const db = new DbDexie(dbName)
  db.character.put({
    id: 1,
    name: '张三'
  })
  return db
}
