export const ReStartStories: Array<Dto.StoryPlot> = [
  {
    name: 'restart',
    type: 'main-line',
    script: '/static/scripts/restart.rpy',
    cover: '',
    text: ['主线任务']
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
        name: 'game.option.choose_immortal',
        text: '玄幻修仙',
        next: 'scene.choose_world',
        effect: {
          type: 'all',
          effects: [
            {
              type: 'setFlag',
              value: 'world.immortal',
              text: '你选择了修仙世界'
            }
          ]
        },
        type: 'story'
      },
      {
        name: 'game.option.choose_city',
        text: '都市异能',
        next: 'scene.choose_world',
        type: 'story',
        effect: {
          type: 'all',
          effects: [
            {
              type: 'setFlag',
              value: 'world.city',
              text: '你选择了都市世界'
            }
          ]
        },
        isDisabled: true
      },
      {
        name: 'game.option.choose_random',
        text: '武侠',
        type: 'story',
        isDisabled: true,
        effect: { type: 'all', effects: [] }
      }
    ]
  },
  {
    name: 'scene.choose_world',
    title: 'title',
    cover: '',
    next: 'scene.set_special',
    options: [],
    text: ['又是一阵晕眩，你晕了过去']
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
