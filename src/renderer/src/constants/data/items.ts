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

export const ShopGoodsRecord: Record<ShopType, Dto.ShopEntity> = {
  happy_shop: {
    goods: [
      {
        name: 'beer',
        count: 10,
        price: 10,
        type: 'food'
      },
      {
        name: 'cola',
        count: 18,
        price: 20,
        type: 'food'
      },
      {
        name: 'coffee',
        count: 80,
        price: 40,
        type: 'food'
      },
      {
        name: 'croissant',
        count: 60,
        price: 50,
        type: 'food'
      },
      {
        name: 'fired_eggs',
        count: 150,
        price: 1000,
        type: 'food'
      },
      {
        name: 'fish',
        count: 20,
        price: 20,
        type: 'food'
      },
      {
        name: 'hamburger',
        count: 30,
        price: 20,
        type: 'food'
      },
      {
        name: 'milk',
        count: 105,
        price: 50,
        type: 'food'
      },
      {
        name: 'sandwich',
        count: 100,
        price: 110,
        type: 'food'
      },
      {
        name: 'house_lin_key',
        count: 1,
        price: 800,
        type: 'task'
      }
    ],
    name: 'map.building.happy_shop.title',
    manager: 'map.building.happy_shop.manager',
    money: 20000
  },
  walmart: {
    name: 'walmart',
    manager: '',
    money: 0,
    goods: [
      {
        name: 'sandwich',
        count: 10,
        price: 10,
        type: 'food'
      }
    ]
  },
  yong_hui: {
    name: 'walmart',
    manager: '',
    money: 0,
    goods: [
      {
        name: 'sandwich',
        count: 10,
        price: 10,
        type: 'food'
      }
    ]
  }
}
