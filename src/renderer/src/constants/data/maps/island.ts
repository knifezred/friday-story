import { useCondition } from '@renderer/hooks/game/condition'

const condition = useCondition()
export const IslandMaps: Array<Dto.MapItem> = [
  {
    name: 'island',
    level: 'country',
    isLocked: true,
    children: [
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
                      {
                        name: 'home.living_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.bedroom',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.plyer_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.sister_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.cousin_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.kitchen',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.bathroom',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'home.backyard',
                        level: 'room',
                        title: '',
                        desc: ''
                      }
                    ],
                    title: '',
                    desc: ''
                  },
                  {
                    name: 'lin_home',
                    level: 'building',
                    options: [
                      {
                        name: 'game.map.next',
                        condition: [
                          {
                            type: 'or',
                            conditions: [
                              { func: condition.inTime, value: '8:00-23:00' },
                              { func: condition.hasItem, value: 'task.lin_home_key' }
                            ],
                            for: 'execute'
                          }
                        ],
                        text: 'game.option.enter',
                        next: 'room.lin_home.living_room',
                        type: 'map',
                        line: []
                      },
                      {
                        name: 'finger-guessing',
                        text: 'game.option.finger-guessing',
                        icon: 'fluent-emoji:victory-hand',
                        miniGame: 'finger-guessing',
                        type: 'mini-game',
                        line: []
                      },
                      {
                        name: 'dice-number',
                        text: 'game.option.dice-number',
                        icon: 'streamline-emojis:game-dice',
                        buttonType: 'error',
                        miniGame: 'dice-number',
                        type: 'mini-game',
                        line: []
                      }
                    ],
                    children: [
                      {
                        name: 'lin_home.living_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'lin_home.bedroom',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'lin_home.kitchen',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'lin_home.sec_room',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'lin_home.bathroom',
                        level: 'room',
                        title: '',
                        desc: ''
                      },
                      {
                        name: 'lin_home.door',
                        level: 'room',
                        next: 'building.lin_home',
                        options: [
                          {
                            name: 'game.map.next',
                            text: 'game.option.goOut',
                            next: 'building.lin_home',
                            type: 'map',
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
                    name: 'happy_shop',
                    level: 'building',
                    options: [
                      {
                        name: 'shop.enter',
                        type: 'shop',
                        next: 'happy_shop',
                        text: 'game.option.enter',
                        condition: [
                          {
                            type: 'and',
                            conditions: [
                              {
                                func: condition.inTime,
                                value: '09:00-23:00',
                                text: 'game.condition.openHour'
                              }
                            ],
                            for: 'execute'
                          }
                        ],
                        line: []
                      },
                      {
                        name: 'test.button',
                        next: 'demo',
                        text: 'stories.start',
                        type: 'story',
                        line: []
                      }
                    ],
                    title: '开心超市',
                    desc: '开心超市，平安路上一家小超市，可以购买一些日用品'
                  }
                ],
                title: '平安路',
                desc: ''
              },
              {
                name: 'backstreet',
                level: 'street',
                title: '后街',
                desc: ''
              },
              {
                name: 'kaiYuan',
                level: 'street',
                children: [
                  {
                    name: 'centerPark',
                    level: 'building',
                    title: '',
                    desc: ''
                  },
                  {
                    name: 'oGenPlaza',
                    level: 'building',
                    title: '',
                    desc: ''
                  }
                ],
                title: '',
                desc: ''
              }
            ],
            title: '太白区',
            desc: ''
          }
        ],
        title: '神代城',
        desc: ''
      }
    ],
    title: '浮岛国',
    desc: '失落的小岛'
  }
]
