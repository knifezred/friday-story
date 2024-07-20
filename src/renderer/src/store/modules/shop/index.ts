import { DefaultGameItems, ShopGoodsRecord } from '@renderer/constants/data/items'
import { SetupStoreId } from '@renderer/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShopStore = defineStore(SetupStoreId.Shop, () => {
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
      item.desc = 'items.' + item.type + '.' + item.name + '.desc'
      item.title = 'items.' + item.type + '.' + item.name + '.title'
      item.cover = '/static/items/' + item.type + '/' + item.name.replaceAll('.', '/') + '.png'
    })
  }
  initShopItems()

  return { currentShop, ShopGoods }
})
