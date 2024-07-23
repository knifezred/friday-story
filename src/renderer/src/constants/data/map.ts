// ## 判断条件
// 时间（间隔天数，星期几，几号，几月）
// 位置（房间id）
// 角色属性
// 人物关系
// 配置

export const DefaultMaps: Array<Dto.MapItem> = [
  {
    id: 1,
    pid: 0,
    nextId: 1,
    name: 'friday',
    level: 'country',
    options: []
  },
  {
    id: 2,
    pid: 1,
    nextId: 2,
    name: 'boot',
    level: 'city',
    options: []
  },
  {
    id: 3,
    pid: 2,
    nextId: 3,
    name: 'dongshan',
    level: 'area',
    options: []
  },
  {
    id: 4,
    pid: 3,
    nextId: 4,
    name: 'pingan',
    level: 'street',
    options: []
  },
  {
    id: 5,
    pid: 4,
    nextId: 5,
    name: 'home',
    level: 'building',
    options: []
  },
  {
    id: 6,
    pid: 5,
    name: 'home.living_room',
    level: 'room',
    options: []
  },
  {
    id: 7,
    pid: 5,
    name: 'home.bedroom',
    level: 'room',
    options: []
  },
  {
    id: 8,
    pid: 5,
    name: 'home.room_player',
    level: 'room',
    options: []
  },
  {
    id: 9,
    pid: 5,
    name: 'home.room_sister',
    level: 'room',
    options: []
  },
  {
    id: 10,
    pid: 5,
    name: 'home.room_cousin',
    level: 'room',
    options: []
  },
  {
    id: 11,
    pid: 5,
    name: 'home.kitchen',
    level: 'room',
    options: []
  },
  {
    id: 12,
    pid: 5,
    name: 'home.bathroom',
    level: 'room',
    options: []
  },
  {
    id: 13,
    pid: 5,
    nextId: 4,
    name: 'home.door',
    level: 'room',
    options: []
  },
  {
    id: 14,
    pid: 4,
    nextId: 14,
    name: 'house_lin',
    level: 'building',
    options: [
      {
        name: 'map.next',
        condition: {
          type: 'and',
          conditions: [
            {
              type: 'betweenHours',
              value: '0-8',
              result: false
            },
            {
              type: 'hasItem',
              value: 'task.house_lin_key',
              result: true
            }
          ]
        },
        text: 'option.enter',
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
    condition: {
      type: 'and',
      conditions: [
        {
          type: 'hasItem',
          value: 'task.house_lin_key',
          result: true
        }
      ]
    }
  },
  {
    id: 15,
    pid: 14,
    name: 'house_lin.living_room',
    level: 'room',
    options: []
  },
  {
    id: 16,
    pid: 14,
    name: 'house_lin.bedroom',
    level: 'room',
    options: []
  },
  {
    id: 17,
    pid: 14,
    name: 'house_lin.kitchen',
    level: 'room',
    options: []
  },
  {
    id: 18,
    pid: 14,
    name: 'house_lin.lin_room',
    level: 'room',
    options: []
  },
  {
    id: 19,
    pid: 14,
    name: 'house_lin.bathroom',
    level: 'room',
    options: []
  },
  {
    id: 20,
    pid: 14,
    nextId: 4,
    name: 'house_lin.door',
    level: 'room',
    options: []
  },
  {
    id: 21,
    pid: 4,
    name: 'happy_shop',
    level: 'building',
    options: [
      {
        name: 'shop.enter',
        next: 'happy_shop',
        text: 'option.enter',
        type: 'shop',
        condition: {
          type: 'and',
          conditions: [
            {
              type: 'betweenHours',
              value: '22-9',
              result: false
            }
          ]
        }
      },
      {
        name: 'test.button',
        next: 'start',
        text: 'stories.start',
        type: 'story'
      }
    ],
    condition: {
      type: 'and',
      conditions: [
        {
          type: 'betweenHours',
          value: '22-9',
          result: false
        }
      ]
    }
  },
  {
    id: 22,
    pid: 3,
    name: 'backstreet',
    level: 'street',
    options: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 23,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 247,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 25,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 26,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 27,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 28,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 29,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  },
  {
    id: 30,
    pid: 3,
    name: 'demo',
    level: 'room',
    options: []
  }
]
