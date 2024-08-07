export const IslandMaps: Array<Dto.MapItem> = [
  {
    name: 'island',
    level: 'country',
    isLocked: true,
    children: [
      {
        name: 'osaka',
        level: 'city'
      },
      {
        name: 'sapporo',
        level: 'city'
      },
      {
        name: 'sendai',
        level: 'city',
        children: [
          {
            name: 'taiBai',
            level: 'area',
            children: [
              {
                name: 'pingAn',
                level: 'street',
                children: [
                  {
                    name: 'home',
                    level: 'building',
                    children: [
                      { name: 'home.living_room', level: 'room' },
                      { name: 'home.bedroom', level: 'room' },
                      { name: 'home.plyer_room', level: 'room' },
                      { name: 'home.sister_room', level: 'room' },
                      { name: 'home.cousin_room', level: 'room' },
                      { name: 'home.kitchen', level: 'room' },
                      { name: 'home.bathroom', level: 'room' },
                      { name: 'home.backyard', level: 'room' }
                    ]
                  },
                  {
                    name: 'lin_home',
                    level: 'building',
                    options: [
                      {
                        name: 'map.next',
                        condition: [
                          {
                            type: 'or',
                            conditions: [
                              { type: 'inTime', value: '8:00-23:00' },
                              { type: 'hasItem', value: 'task.lin_home_key' }
                            ],
                            for: 'execute'
                          }
                        ],
                        text: 'option.enter',
                        next: 'room.lin_home.living_room',
                        type: 'map'
                      },
                      {
                        name: 'finger-guessing',
                        text: 'option.finger-guessing',
                        icon: 'fluent-emoji:victory-hand',
                        miniGame: 'finger-guessing',
                        type: 'mini-game'
                      },
                      {
                        name: 'dice-number',
                        text: 'option.dice-number',
                        icon: 'streamline-emojis:game-dice',
                        buttonType: 'error',
                        miniGame: 'dice-number',
                        type: 'mini-game'
                      }
                    ],
                    children: [
                      { name: 'lin_home.living_room', level: 'room' },
                      { name: 'lin_home.bedroom', level: 'room' },
                      { name: 'lin_home.kitchen', level: 'room' },
                      { name: 'lin_home.sec_room', level: 'room' },
                      { name: 'lin_home.bathroom', level: 'room' },
                      {
                        name: 'lin_home.door',
                        level: 'room',
                        next: 'building.lin_home',
                        options: [
                          {
                            name: 'map.next',
                            text: 'option.goOut',
                            next: 'building.lin_home',
                            type: 'map'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'happy_shop',
                    level: 'building',
                    options: [
                      {
                        name: 'shop.enter',
                        type: 'shop',
                        next: 'happy_shop',
                        text: 'option.enter',
                        condition: [
                          {
                            type: 'and',
                            conditions: [
                              {
                                type: 'inTime',
                                value: '09:00-23:00',
                                text: 'condition.openHour'
                              }
                            ],
                            for: 'execute'
                          }
                        ]
                      },
                      {
                        name: 'test.button',
                        next: 'restart',
                        text: 'stories.start',
                        type: 'story'
                      }
                    ]
                  }
                ]
              },
              { name: 'backstreet', level: 'street' },
              {
                name: 'kaiYuan',
                level: 'street',
                children: [
                  {
                    name: 'centerPark',
                    level: 'building'
                  },
                  {
                    name: 'oGenPlaza',
                    level: 'building'
                  }
                ]
              }
            ]
          },
          {
            name: 'quan',
            level: 'area'
          },
          {
            name: 'qingYe',
            level: 'area'
          },
          {
            name: 'ruoLin',
            level: 'area'
          },
          {
            name: 'gongYe',
            level: 'area'
          }
        ]
      },
      {
        name: 'nagoya',
        level: 'city'
      },
      {
        name: 'fukuoka',
        level: 'city'
      },
      {
        name: 'tokyo',
        level: 'city'
      },
      {
        name: 'yokohama',
        level: 'city'
      },
      {
        name: 'kobe',
        level: 'city'
      },
      {
        name: 'kawasaki',
        level: 'city'
      }
    ]
  }
]
