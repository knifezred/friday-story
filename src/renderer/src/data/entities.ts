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
  story: string
  room: number
}
