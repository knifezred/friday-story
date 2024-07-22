// type+'.'+name
export const DefaultGameItems: Array<Dto.GameItem> = [
  {
    name: 'beer',
    type: 'food',
    level: 'SSR'
  },
  {
    name: 'cola',
    type: 'food',
    level: 'SR'
  },
  {
    name: 'coffee',
    type: 'food',
    level: 'SR'
  },
  {
    name: 'croissant',
    type: 'food',
    level: 'R'
  },
  {
    name: 'fired_eggs',
    type: 'food',
    level: 'R'
  },
  {
    name: 'fish',
    type: 'food',
    level: 'N'
  },
  {
    name: 'hamburger',
    type: 'food',
    level: 'SR'
  },
  {
    name: 'milk',
    type: 'food',
    level: 'SSR'
  },
  {
    name: 'sandwich',
    type: 'food',
    level: 'SR'
  },
  {
    name: 'house_lin_key',
    type: 'task',
    level: 'SR'
  }
]

export type ShopType = 'happy_shop' | 'walmart' | 'yong_hui'

export const ShopGoodsRecord: Record<ShopType, Array<Dto.ShopGoods>> = {
  happy_shop: [
    {
      name: 'beer',
      count: 10,
      price: 10
    },
    {
      name: 'cola',
      count: 18,
      price: 20
    },
    {
      name: 'coffee',
      count: 80,
      price: 40
    },
    {
      name: 'croissant',
      count: 60,
      price: 50
    },
    {
      name: 'fired_eggs',
      count: 150,
      price: 1000
    },
    {
      name: 'fish',
      count: 20,
      price: 20
    },
    {
      name: 'hamburger',
      count: 30,
      price: 20
    },
    {
      name: 'milk',
      count: 105,
      price: 50
    },
    {
      name: 'sandwich',
      count: 100,
      price: 110
    }
  ],
  walmart: [
    {
      name: 'sandwich',
      count: 10,
      price: 10
    }
  ],
  yong_hui: [
    {
      name: 'sandwich',
      count: 10,
      price: 10
    }
  ]
}
