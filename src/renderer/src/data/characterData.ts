export interface Character {
  id: number
  avatar?: string
  name?: string
  title?: string
  job?: string
  age?: number
}

export const Characters: Character[] = [
  {
    id: 1,
    avatar: 'imgs/character/1.jpg',
    name: '张三',
    title: '朋友',
    job: ''
  }
]
