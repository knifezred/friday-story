export const DefaultStories: Array<Dto.StoryPlot> = [
  {
    name: 'start',
    type: 'main-line',
    cover: '',
    text: ['这是一个主线剧情', '多段text测试'],
    nextScene: 'scene.set_name'
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
  }
]
