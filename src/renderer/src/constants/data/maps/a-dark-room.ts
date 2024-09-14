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
                        type: 'maxOptionNum',
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
                        type: 'maxOptionNum',
                        value: 'game.option.explore,1'
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'addItem',
                      value: 'material.wood,5'
                    },
                    {
                      type: 'unlockMap',
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
                        type: 'maxOptionNum',
                        value: 'game.option.explore,1',
                        result: false
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        type: 'hasItem',
                        value: 'material.wood,1'
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'useItem',
                      value: 'material.wood,1'
                    },
                    {
                      type: 'changeRoomTemperature',
                      value: '5',
                      success: ''
                    }
                  ]
                },
                line: []
              }
            ]
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
                        type: 'checkFlag',
                        value: 'room.darkHouse.roomWork.unlock,1',
                        success: '你需要3根木头来修理工作台',
                        result: false
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        type: 'hasItem',
                        value: 'material.wood,3'
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'useItem',
                      value: 'material.wood,3'
                    },
                    {
                      type: 'setFlag',
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
                        type: 'checkFlag',
                        value: 'room.darkHouse.roomWork.unlock,1'
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
                        type: 'checkFlag',
                        value: 'room.darkHouse.roomWork.unlock,1'
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
            ]
          }
        ]
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
                  type: 'addItem',
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
                  type: 'addItem',
                  value: 'food.fish,1-3',
                  notification: true
                }
              ]
            },
            line: []
          }
        ]
      }
    ]
  }
]
