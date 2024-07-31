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
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'addItem',
                      value: 'material.wood,5',
                      result: true
                    },
                    {
                      type: 'unlockMap',
                      value: 'room.darkHouse.roomWork',
                      text: '你发现了工作台',
                      result: true
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
              }
            ]
          },
          {
            name: 'darkHouse.roomWork',
            level: 'room',
            isShow: false
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
                  value: 'material.wood,10',
                  result: true
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
