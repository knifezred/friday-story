import { DefaultGameItems, ShopGoodsRecord } from '@renderer/constants/data/items'
import { SetupStoreId } from '@renderer/enums'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameItemStore = defineStore(SetupStoreId.GameItem, () => {
  const currentShop = ref('happy_shop')

  function ShopGoods() {
    const goodsList: Array<Dto.ShopGoods> = ShopGoodsRecord[currentShop.value]
    goodsList.forEach((goods) => {
      const gameItem = DefaultGameItems.filter((x) => x.id == goods.id)[0]
      goods.name = gameItem.name
      goods.title = gameItem.title
      goods.desc = gameItem.desc
      goods.cover = gameItem.cover
      goods.level = gameItem.level
      goods.type = gameItem.type
      goods.selectedCount = 0
    })
    return goodsList
  }

  function initShopItems() {
    DefaultGameItems.forEach((item) => {
      item.desc = localeText(item.desc, item.type + '.' + item.name, 'items', 'desc').toString()
      item.title = localeText(item.title, item.type + '.' + item.name, 'items', 'title').toString()
      item.cover = prefixImage(item.cover, item.name, 'items/' + item.type, '.png')
    })
  }

  return { currentShop, ShopGoods, initShopItems }
})
