import { DefaultGameItems, ShopGoodsRecord } from '@renderer/constants/data/items'
import { SetupStoreId } from '@renderer/enums'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameItemStore = defineStore(SetupStoreId.GameItem, () => {
  const currentShop = ref('')
  function ShopGoods() {
    const goodsList: Array<Dto.ShopGoods> = ShopGoodsRecord[currentShop.value]
    goodsList.forEach((goods) => {
      if (goods.name.indexOf('.') == -1) {
        goods.name = goods.type + '.' + goods.name
      }
      const gameItem = DefaultGameItems.filter((x) => x.name == goods.name)[0]
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
      item.name = item.type + '.' + item.name
      item.desc = localeText(item.desc, item.name, 'items', 'desc').toString()
      item.title = localeText(item.title, item.name, 'items', 'title').toString()
      item.cover = prefixImage(item.cover, item.name, 'items', '.png')
    })
  }

  return { currentShop, ShopGoods, initShopItems }
})
