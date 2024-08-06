export const MainStartStories: Array<Dto.StoryPlot> = [
  {
    name: 'main_start',
    type: 'main-line',
    cover: '',
    text: ['嘶，你被冻醒了', '你缓过神来发现，地上散落着几张卡牌'],
    nextScene: 'scene.set_name'
  }
]

export const MainStartScenes: Array<Dto.GameScene> = [
  {
    name: 'scene.set_name',
    title: 'title',
    text: ['test'],
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
    title: 'title',
    cover: '',
    next: 'scene.set_special',
    options: [],
    text: ['hello world']
  },
  {
    name: 'scene.set_special',
    title: '',
    cover: '',
    next: '',
    options: [],
    text: ['hello']
  }
]
