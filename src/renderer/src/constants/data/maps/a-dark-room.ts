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
                condition: [
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        type: 'maxOptionNum',
                        value: 'option.explore,1',
                        failure: '什么也没有发现'
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
                      text: '你发现了工作台'
                    }
                  ]
                }
              },
              {
                name: 'option.addWood',
                text: 'option.addWood',
                type: 'map',
                condition: [
                  {
                    type: 'and',
                    for: 'show',
                    conditions: [
                      {
                        type: 'hasItem',
                        value: 'material.wood'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: 'darkHouse.roomWork',
            level: 'room',
            isShow: false,
            options: [
              {
                name: 'option.fixed',
                text: 'option.make',
                type: 'map',
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
                        value: 'material.wood,3',
                        failure: '木头不足,你需要3根木头来修理工作台'
                      }
                    ]
                  }
                ],
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'useItem',
                      value: 'material.wood,3',
                      success: ''
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
                  },
                  {
                    type: 'and',
                    for: 'execute',
                    conditions: [
                      {
                        type: 'hasItem',
                        value: 'material.wood,3',
                        failure: '木头不足'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'option.repair',
                text: 'option.repair',
                type: 'map'
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
            effect: {
              type: 'all',
              effects: [
                {
                  type: 'addItem',
                  value: 'material.wood,10'
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
