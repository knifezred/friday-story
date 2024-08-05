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
                name: 'option.explore',
                text: 'option.explore',
                type: 'map',
                duration: 2000,
                condition: [
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        type: 'maxOptionNum',
                        value: 'option.explore,1',
                        failure: 'message.nothingFound'
                      }
                    ]
                  },
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        type: 'maxOptionNum',
                        value: 'option.explore,1'
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
                      success: 'message.findMap'
                    }
                  ]
                }
              },
              {
                name: 'option.addWood',
                text: 'option.addWood',
                type: 'map',
                duration: 3000,
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        type: 'maxOptionNum',
                        value: 'option.explore,1',
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
                }
              }
            ]
          },
          {
            name: 'darkHouse.roomWork',
            level: 'room',
            isShow: false,
            options: [
              {
                name: 'option.fix',
                text: 'option.fix',
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
                      type: 'addFlag',
                      value: 'room.darkHouse.roomWork.unlock,1',
                      success: '工作台已解锁'
                    }
                  ]
                }
              },
              {
                name: 'option.make',
                text: 'option.make',
                type: 'map',
                duration: 3000,
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
                ]
              },
              {
                name: 'option.repair',
                text: 'option.repair',
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
                ]
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
            name: 'option.cutTree',
            text: 'option.cutTree',
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
            }
          },
          {
            name: 'option.catchFish',
            text: 'option.catchFish',
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
            }
          }
        ]
      }
    ]
  }
]
