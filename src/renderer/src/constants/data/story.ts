import { MainStartScenes, MainStartStories } from './stories/main-start'

export const DefaultStories: Array<Dto.StoryPlot> = [
  ...MainStartStories,
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
    text: ['房间寒冷刺骨', '火堆快熄灭了'],
    nextScene: 'scene.makeRoomHot',
    options: [
      {
        name: 'option.addWood',
        text: 'option.addWood',
        type: 'story',
        condition: [
          {
            type: 'and',
            for: 'load',
            conditions: [
              {
                type: 'hasItem',
                value: 'material.wood',
                result: true
              }
            ]
          }
        ]
      },
      {
        name: 'option.pickWood',
        text: 'option.pickWood',
        type: 'story',
        effect: {
          type: 'all',
          effects: [
            {
              type: 'addItem',
              value: 'material.wood,5',
              result: true
            }
          ]
        }
      }
    ]
  }
]

export const DefaultScenes: Array<Dto.GameScene> = [
  ...MainStartScenes,
  {
    name: 'scene.makeRoomHot',
    title: '',
    text: [],
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
