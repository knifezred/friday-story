export const MetroMap: Array<Dto.MapItem> = [
  {
    name: 'line1',
    level: 'metro',
    children: [
      {
        name: 'centerPark',
        level: 'metro',
        next: 'building.centerPark',
        title: '中心公园站',
        desc: '中心公园'
      }
    ],
    title: '地铁1号线',
    desc: '建立最早的线路、连通城市东西区域'
  }
]
