export const ReStartStories: Array<Dto.StoryPlot> = [
  {
    name: 'restart',
    type: 'main-line',
    cover: '',
    text: ['周五下班的你在地铁上无聊的刷着手机'],
    nextScene: 'scene.restart.fainted'
  }
]

export const RestartScenes: Array<Dto.GameScene> = [
  {
    name: 'scene.restart.fainted',
    title: 'title',
    text: ['突然一真晕眩，你两眼漆黑倒在了地上'],
    cover: '',
    next: 'scene.restart.wake',
    options: []
  },
  {
    name: 'scene.restart.wake',
    title: 'title',
    text: ['不知道过了多久，你再次醒来', '缓过神来的你发现，地上散落着几张卡牌'],
    cover: '',
    next: 'scene.selectSpecial',
    options: []
  },
  {
    name: 'scene.selectSpecial',
    title: 'title',
    text: ['你捡起了卡牌仔细观察'],
    cover: '',
    next: '',
    options: [
      {
        name: 'option.choose_card1',
        text: 'option.choose1',
        next: 'scene.choose_id',
        type: 'story'
      },
      {
        name: 'option.choose_card2',
        text: 'option.choose2',
        next: 'scene.choose_id',
        type: 'story'
      },
      {
        name: 'option.choose_card3',
        text: 'option.choose3',
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
    text: ['你选择了卡牌']
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
