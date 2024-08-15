export type WorkbenchType = 'default' | 'darkHouse'

export const WorkbenchRecords: Record<WorkbenchType, Dto.ShopEntity> = {
  default: {
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
    ],
    name: 'game.map.building.happy_shop.title',
    manager: 'game.map.building.happy_shop.manager',
    money: 20000
  },
  darkHouse: {
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
