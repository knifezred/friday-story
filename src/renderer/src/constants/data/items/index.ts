import { FoodGameItems } from './foods'
import { MaterialGameItems } from './material'

export const GameItemCollections: Array<Dto.GameItemCollection> = [
  {
    type: 'food',
    items: [...FoodGameItems]
  },
  {
    type: 'material',
    items: [...MaterialGameItems]
  }
]

export const TotalGameItems: Array<Dto.GameItemFull> = []

export const ItemTypeList: Array<Dto.ItemTypeInfo> = [
  {
    type: 'food',
    name: '食物'
  },
  {
    type: 'equipment',
    name: '装备'
  },
  {
    type: 'material',
    name: '材料'
  },
  {
    type: 'book',
    name: '书信'
  },
  {
    type: 'car',
    name: '座驾'
  },
  {
    type: 'task',
    name: '特殊'
  },
  {
    type: 'other',
    name: '其他'
  }
]
