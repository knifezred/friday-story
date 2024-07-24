// ## 判断条件// 时间（间隔天数，星期几，几号，几月）// 位置（房间id）// 角色属性// 人物关系// 配置
export const DefaultMaps: Array<Dto.MapItem> = [
  {
    name: 'friday',
    level: 'country',
    children: [
      {
        name: 'boot',
        level: 'city',
        children: [
          {
            name: 'dongShan',
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
                        condition: {
                          type: 'or',
                          conditions: [
                            { type: 'betweenHours', value: '8-23', result: true },
                            { type: 'hasItem', value: 'task.lin_home_key', result: true }
                          ]
                        },
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
                    isLocked: true,
                    children: [
                      { name: 'lin_home.living_room', level: 'room' },
                      { name: 'lin_home.bedroom', level: 'room' },
                      { name: 'lin_home.kitchen', level: 'room' },
                      { name: 'lin_home.lin_room', level: 'room' },
                      { name: 'lin_home.bathroom', level: 'room' },
                      { name: 'lin_home.door', level: 'room', next: 'building.lin_home' }
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
                        condition: {
                          type: 'and',
                          conditions: [
                            {
                              type: 'betweenHours',
                              value: '9-23',
                              text: 'condition.openHour',
                              result: true
                            }
                          ]
                        }
                      },
                      { name: 'test.button', next: 'start', text: 'stories.start', type: 'story' }
                    ],
                    condition: {
                      type: 'and',
                      conditions: [{ type: 'betweenHours', value: '22-9', result: false }]
                    }
                  }
                ]
              }
            ]
          },
          { name: 'backstreet', level: 'street' },
          { name: 'metro', level: 'building' }
        ]
      }
    ]
  }
]
