import { GameItemCollections } from '@renderer/constants/data/items/index'
import { localeText, prefixImage } from '@renderer/utils/common'

export function initGameItems() {
  const items: Array<Dto.GameItemFull> = []
  GameItemCollections.forEach((co) => {
    co.items.forEach((item) => {
      item.type = co.type
      items.push({
        ...item,
        desc: localeText(item.desc, item.name, 'game.items', 'desc'),
        title: localeText(item.title, item.name, 'game.items', 'title'),
        cover: prefixImage(item.cover, item.name, 'items', '.png'),
        type: co.type,
        name: co.type + '.' + item.name,
        count: item.count ?? -1
      })
    })
  })
  return items
}
