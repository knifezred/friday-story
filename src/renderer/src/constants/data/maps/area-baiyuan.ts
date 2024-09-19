export const AreaBaiYuanMaps: Array<Dto.MapItem> = [
  {
    name: 'baiYuan',
    title: '白源区',
    desc: '这里竹林环绕，清幽寂静，是个隐世僻静之地，传说中武罗就出没于此',
    level: 'area',
    isLocked: true,
    children: [
      {
        name: 'xinDaZhen',
        title: '新达镇',
        desc: '踏足八荒的第一站',
        level: 'street',
        children: [
          {
            name: 'inn',
            level: 'building',
            title: '客栈',
            desc: '休憩养伤不二之选',
            options: [
              {
                name: 'queryInfo',
                text: '休息',
                line: [],
                type: 'map'
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
              }
            ],
            title: '酒馆',
            desc: '何不试试一气猛喝几口'
          },
          {
            name: 'workshop',
            level: 'building',
            title: '工坊',
            desc: '提供简单的加工打造功能'
          },
          {
            name: 'market',
            level: 'building',
            title: '坊市',
            desc: '提供基础的物资供给'
          },
          {
            name: 'skillLibrary',
            level: 'building',
            title: '仙法阁',
            desc: '收录天下功法'
          },
          {
            name: 'warehouse',
            level: 'building',
            title: '建木',
            desc: '可存放物品'
          }
        ]
      },
      {
        name: 'yuCun',
        title: '愚村',
        desc: '太行王屋二山山脚下的一个村落，因愚公移山而得名愚村',
        level: 'building',
        children: []
      },
      {
        name: 'wuLuoHole',
        level: 'building',
        children: [],
        title: '神秘山洞',
        desc: '传说中武罗隐居之地'
      },
      {
        name: 'portal',
        level: 'building',
        isShow: false,
        children: [],
        title: '传送阵',
        desc: '通往外界的传送阵法'
      }
    ]
  }
]
