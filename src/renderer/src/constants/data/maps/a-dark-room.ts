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
                      value: 'other.wood,5',
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
                        value: 'other.wood',
                        result: true
                      }
                    ]
                  }
                ]
              },
              {
                name: 'option.pickWood',
                text: 'option.pickWood',
                type: 'map',
                effect: {
                  type: 'all',
                  effects: [
                    {
                      type: 'addItem',
                      value: 'other.wood,5',
                      result: true
                    }
                  ]
                }
              }
            ]
          },
          {
            name: 'darkHouse.room1',
            level: 'room'
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
                  value: 'other.wood,10',
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
