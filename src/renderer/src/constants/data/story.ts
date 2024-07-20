export const DefaultStories: Array<Dto.StoryPlot> = [
  {
    name: 'start',
    type: 'main-line',
    cover: '',
    text: ['这是一个主线剧情'],
    scenes: ['scene.set_name']
  }
]

export const DefaultScenes: Array<Dto.GameScene> = [
  {
    name: 'scene.set_name',
    title: 'title',
    cover: '',
    next: '',
    options: [
      {
        name: '',
        title: '',
        text: '',
        next: 'scene.choose_id'
      }
    ]
  },
  {
    name: 'scene.choose_id',
    title: '',
    cover: '',
    next: '',
    options: []
  }
]
