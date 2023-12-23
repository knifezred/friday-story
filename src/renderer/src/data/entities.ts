import Dexie, { Table } from 'dexie'
import { AllRooms } from './roomData'

export interface Archive {
  id: number
  title: string
  data: string
  savedTime: Date
}
export interface ArchiveData {
  playerId: number
  roomId: number
  worldTime: Date
  achievements: number[]
}
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
  archives!: Table<Archive>
  character!: Table<Character>
  rooms!: Table<Room>
  // stories!: Table<Story>
  // storyActions!: Table<StoryAction>

  constructor(dbName: string) {
    super(dbName)
    this.version(5).stores({
      archives: '++id, title, data, savedTime',
      character: '++id, name, avatar, title, job, age',
      rooms: 'id, pid, bg, name, description, media, empty, hidden'
    })
  }
}

export function connDb(dbName: string): DbDexie {
  const db = new DbDexie(dbName)
  db.character.put({
    id: 1,
    name: '张三'
  })
  db.rooms.bulkPut(AllRooms)
  const archiveData = {
    roomId: 0,
    playerId: 1
  }
  db.archives.put({
    id: 1,
    title: '测试',
    data: JSON.stringify(archiveData),
    savedTime: new Date()
  })
  return db
}
