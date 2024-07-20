export const DefaultGameItems: Array<Dto.GameItem> = [
  {
    id: 1,
    name: 'cola',
    type: 'food',
    level: 'SR'
  },
  {
    id: 2,
    name: 'beer',
    type: 'food',
    level: 'SR'
  },
  {
    id: 3,
    name: 'coffee',
    type: 'food',
    level: 'SR'
  },
  {
    id: 4,
    name: 'croissant',
    type: 'food',
    level: 'SR'
  },
  {
    id: 5,
    name: 'fired_eggs',
    type: 'food',
    level: 'SR'
  },
  {
    id: 6,
    name: 'fish',
    type: 'food',
    level: 'SR'
  },
  {
    id: 7,
    name: 'hamburger',
    type: 'food',
    level: 'SR'
  },
  {
    id: 8,
    name: 'milk',
    type: 'food',
    level: 'SR'
  },
  {
    id: 9,
    name: 'sandwich',
    type: 'food',
    level: 'SR'
  }
]

export type ShopType = 'happy_shop' | 'walmart' | 'yong_hui'

export const ShopGoodsRecord: Record<ShopType, Array<Dto.ShopGoods>> = {
  happy_shop: [
    {
      id: 1,
      count: 10,
      price: 10
    },
    {
      id: 2,
      count: 18,
      price: 20
    },
    {
      id: 3,
      count: 80,
      price: 40
    },
    {
      id: 4,
      count: 60,
      price: 50
    },
    {
      id: 5,
      count: 150,
      price: 1000
    },
    {
      id: 6,
      count: 20,
      price: 20
    },
    {
      id: 7,
      count: 30,
      price: 20
    },
    {
      id: 8,
      count: 105,
      price: 50
    },
    {
      id: 9,
      count: 100,
      price: 110
    }
  ],
  walmart: [
    {
      id: 1,
      count: 10,
      price: 10
    }
  ],
  yong_hui: [
    {
      id: 1,
      count: 10,
      price: 10
    }
  ]
}
