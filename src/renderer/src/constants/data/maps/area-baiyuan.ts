import { useActionEffect } from '@renderer/hooks/game/action-effect'

const effect = useActionEffect()
const CityBuildings: Array<Dto.MapItem> = [
  {
    name: 'inn',
    level: 'building',
    title: '客栈',
    desc: '休憩养伤不二之选',
    options: [
      {
        name: 'reset',
        text: '休息',
        line: [],
        type: 'map',
        effect: {
          type: 'all',
          effects: [
            {
              value: 'food.cola,1',
              func: effect.addItem
            }
          ]
        }
      }
    ]
  },
  {
    name: 'pub',
    level: 'building',
    options: [
      {
        name: 'queryInfo',
        text: '打探消息',
        line: [],
        type: 'map'
      },
      {
        name: 'buyWine',
        text: '买酒',
        line: [],
        type: 'shop',
        next: 'pubShop'
      },
      {
        name: 'treatDrink',
        text: '请大家喝一杯',
        line: [],
        type: 'map',
        buttonType: 'error'
      }
    ],
    title: '酒馆',
    desc: '何不试试一气猛喝几口'
  },
  {
    name: 'workshop',
    level: 'building',
    title: '工坊',
    desc: '提供简单的加工打造功能',
    options: [
      {
        name: 'make',
        text: '制作',
        line: [],
        type: 'shop',
        next: 'workshop_1'
      }
    ]
  },
  {
    name: 'market',
    level: 'building',
    title: '坊市',
    desc: '提供基础的物资供给',
    options: [
      {
        name: 'transaction',
        text: '交易',
        line: [],
        type: 'shop',
        next: 'market_1'
      }
    ]
  },
  {
    name: 'skillLibrary',
    level: 'building',
    title: '仙法阁',
    desc: '收录天下功法',
    options: [
      {
        name: 'transaction',
        text: '交易',
        line: [],
        type: 'shop',
        next: 'skillLibrary_1'
      }
    ]
  },
  {
    name: 'inventory',
    level: 'building',
    title: '建木',
    desc: '可存放物品',
    options: [
      {
        name: 'access',
        text: '存取',
        line: [],
        type: 'shop',
        next: 'market_1'
      }
    ]
  }
]

export const AreaBaiYuanMaps: Array<Dto.MapItem> = [
  {
    name: 'world',
    title: '八荒大陆',
    desc: '神奇的土地',
    level: 'country',
    children: [
      {
        name: 'baiYuan',
        title: '白源区',
        desc: '这里竹林环绕，清幽寂静，是个隐世僻静之地，传说中武罗就出没于此',
        level: 'area',
        isLocked: true,
        children: [
          {
            name: 'xinDaTown',
            title: '新达镇',
            desc: '踏足八荒的第一站',
            level: 'street',
            children: [...CityBuildings]
          },
          {
            name: 'yuCun',
            title: '愚村',
            desc: '太行王屋二山山脚下的一个村落，因愚公移山而得名愚村',
            level: 'street',
            children: []
          },
          {
            name: 'wuLuoHole',
            level: 'street',
            title: '神秘山洞',
            desc: '传说中武罗隐居之地',
            children: [],
            options: [
              {
                name: 'explore',
                line: [],
                type: 'story',
                next: 'demo.wuluo_hole',
                text: 'game.option.explore'
              }
            ]
          },
          {
            name: 'portal',
            level: 'street',
            isShow: false,
            children: [],
            title: '传送阵',
            desc: '通往外界的传送阵法',
            next: 'root.world.yongNing.portal'
          }
        ]
      },
      {
        name: 'yongNing',
        title: '永宁州',
        desc: '',
        level: 'area',
        isLocked: true,
        children: [
          {
            name: 'portal',
            level: 'street',
            children: [],
            title: '传送阵',
            desc: '神秘的传送阵，通往白源区',
            next: 'root.world.baiYuan.portal'
          },
          {
            name: 'stoneCity',
            title: '石双城',
            desc: '永宁主城',
            level: 'street',
            children: [...CityBuildings]
          }
        ]
      }
    ]
  }
]
