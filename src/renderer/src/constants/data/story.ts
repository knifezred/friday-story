export const DefaultStories: Array<Dto.StoryPlot> = [
  {
    name: 'main_start',
    type: 'main-line',
    cover: '',
    text: ['这是一个主线剧情', '多段text测试'],
    nextScene: 'scene.set_name'
  },
  {
    name: 'dark_house_start',
    type: 'main-line',
    cover: '',
    text: ['房间寒冷刺骨', '火堆熄灭了'],
    nextScene: 'scene.makeRoomHot',
    options: [
      {
        name: 'option.addWood',
        text: 'option.addWood',
        type: 'story'
      }
    ]
  }
]

export const DefaultScenes: Array<Dto.GameScene> = [
  {
    name: 'scene.set_name',
    title: 'title',
    text: '',
    cover: '',
    next: '',
    options: [
      {
        name: 'option.choose_id',
        text: 'option.choose_id',
        next: 'scene.choose_id',
        type: 'story'
      }
    ]
  },
  {
    name: 'scene.choose_id',
    title: '',
    cover: '',
    next: 'scene.set_special',
    options: [],
    text: ''
  },
  {
    name: 'scene.set_special',
    title: '',
    cover: '',
    next: '',
    options: [],
    text: ''
  },
  {
    name: 'scene.makeRoomHot',
    title: '',
    text: '',
    cover: '',
    next: '',
    options: [
      {
        name: 'option.addWood',
        text: 'option.addWood.ok',
        type: 'story'
      }
    ]
  }
]
