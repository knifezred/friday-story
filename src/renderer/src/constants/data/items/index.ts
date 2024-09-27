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
