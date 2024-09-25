import { EquipmentItems } from './items/equipment'
import { FoodGameItems } from './items/foods'
import { MaterialGameItems } from './items/material'
import { OtherGameItems } from './items/other'
import { TaskGameItems } from './items/task'

// type+'.'+name
export const DefaultGameItems: Array<Dto.GameItem> = [
  ...FoodGameItems,
  ...OtherGameItems,
  ...MaterialGameItems,
  ...TaskGameItems,
  ...EquipmentItems
]

export type ShopType = 'happy_shop' | 'walmart' | 'yong_hui' | 'pubShop'

export const ShopGoodsRecord: Record<ShopType, Dto.ShopEntity> = {
  happy_shop: {
    name: '开心超市',
    manager: 'npc.sister',
    money: 20000,
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
        name: 'lin_home_key',
        count: 1,
        price: 800,
        type: 'task'
      }
    ]
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
  },
  pubShop: {
    name: '酒馆柜台',
    manager: 'npc.cousin',
    money: 20000,
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
        name: 'milk',
        count: 105,
        price: 50,
        type: 'food'
      }
    ]
  }
}
