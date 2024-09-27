import { useActionEffect } from '@renderer/hooks/game/action-effect'
import { useCondition } from '@renderer/hooks/game/condition'

const condition = useCondition()
const effect = useActionEffect()
export const ADarkRoomMaps: Array<Dto.MapItem> = [
  {
    name: 'aDarkRoom',
    level: 'country',
    isLocked: true,
    children: [
      {
        name: 'darkHouse',
        level: 'building',
        children: [
          {
            name: 'darkHouse.begin',
            level: 'room',
            options: [
              {
                name: 'game.option.explore',
                text: 'game.option.explore',
                type: 'map',
                duration: 2000,
                condition: [
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        func: condition.maxOptionNum,
                        value: 'game.option.explore,1',
                        failure: 'game.message.nothingFound'
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        value: 'game.option.explore,1',
                        func: condition.maxOptionNum
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      func: effect.addItem,
                      value: 'material.wood,5'
                    },
                    {
                      func: effect.unlockMap,
                      value: 'room.darkHouse.roomWork',
                      success: 'game.message.findMap'
                    }
                  ]
                },
                line: []
              },
              {
                name: 'game.option.addWood',
                text: 'game.option.addWood',
                type: 'map',
                duration: 3000,
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        value: 'game.option.explore,1',
                        result: false,
                        func: condition.maxOptionNum
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        value: 'material.wood,1',
                        func: condition.hasItem
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      func: effect.useItem,
                      value: 'material.wood,1'
                    },
                    {
                      func: effect.changeRoomTemperature,
                      value: '5',
                      success: ''
                    }
                  ]
                },
                line: []
              }
            ],
            title: '',
            desc: ''
          },
          {
            name: 'darkHouse.roomWork',
            level: 'room',
            isShow: false,
            options: [
              {
                name: 'game.option.fix',
                text: 'game.option.fix',
                type: 'map',
                duration: 5000,
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        value: 'room.darkHouse.roomWork.unlock,1',
                        success: '你需要3根木头来修理工作台',
                        result: false,
                        func: condition.checkFlag
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        value: 'material.wood,3',
                        func: condition.hasItem
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      func: effect.useItem,
                      value: 'material.wood,3'
                    },
                    {
                      func: effect.setFlag,
                      value: 'room.darkHouse.roomWork.unlock,1',
                      success: '工作台已解锁'
                    }
                  ]
                },
                line: []
              },
              {
                name: 'game.option.make',
                text: 'game.option.make',
                type: 'workbench',
                next: 'darkHouse',
                duration: 0,
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        value: 'room.darkHouse.roomWork.unlock,1',
                        func: condition.checkFlag
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: []
                },
                line: []
              },
              {
                name: 'game.option.repair',
                text: 'game.option.repair',
                type: 'map',
                duration: 2000,
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        value: 'room.darkHouse.roomWork.unlock,1',
                        func: condition.checkFlag
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: []
                },
                line: []
              }
            ],
            title: '',
            desc: ''
          }
        ],
        title: '',
        desc: ''
      },
      {
        name: 'mistyForest',
        level: 'building',
        options: [
          {
            name: 'game.option.cutTree',
            text: 'game.option.cutTree',
            type: 'map',
            duration: 10000,
            effect: {
              type: 'all',
              effects: [
                {
                  func: effect.addItem,
                  value: 'material.wood,5-10',
                  notification: true
                }
              ]
            },
            line: []
          },
          {
            name: 'game.option.catchFish',
            text: 'game.option.catchFish',
            type: 'map',
            duration: 10000,
            effect: {
              type: 'all',
              effects: [
                {
                  func: effect.addItem,
                  value: 'food.fish,1-3',
                  notification: true
                }
              ]
            },
            line: []
          }
        ],
        title: '',
        desc: ''
      }
    ],
    title: '小黑屋',
    desc: '复刻'
  }
]
