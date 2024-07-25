import { DefaultGameItems, ShopGoodsRecord } from '@renderer/constants/data/items'
import { SetupStoreId } from '@renderer/enums'
import { createStorage, findStorage, updateStorage } from '@renderer/service/api/storage'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const useGameItemStore = defineStore(SetupStoreId.GameItem, () => {
  const currentShop = ref('')
  const currentShopEntity = ref<Dto.ShopEntity>({
    name: '',
    manager: '',
    money: 0,
    goods: []
  })
  const isUpdate = ref(false)
  const authStore = useAuthStore()
  async function currentShopGoods() {
    // 分存档保存
    const searchKey = authStore.userInfo.archive.id + '.shop.' + currentShop.value
    const shopEntity = await findStorage(searchKey)
    if (shopEntity.data != null && typeof shopEntity.data != 'string') {
      currentShopEntity.value = JSON.parse(shopEntity.data.value)
      isUpdate.value = true
    } else {
      currentShopEntity.value = ShopGoodsRecord[currentShop.value]
      isUpdate.value = false
    }
    currentShopEntity.value.goods.forEach((goods) => {
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
    return currentShopEntity.value.goods
  }

  function initShopItems() {
    DefaultGameItems.forEach((item) => {
      item.name = item.type + '.' + item.name
      item.desc = localeText(item.desc, item.name, 'items', 'desc').toString()
      item.title = localeText(item.title, item.name, 'items', 'title').toString()
      item.cover = prefixImage(item.cover, item.name, 'items', '.png')
    })
  }

  function deal(totalMoney: number) {
    currentShopEntity.value.money += totalMoney
    const searchKey = authStore.userInfo.archive.id + '.shop.' + currentShop.value
    if (isUpdate.value) {
      updateStorage({
        key: searchKey,
        value: JSON.stringify(currentShopEntity.value)
      })
    } else {
      createStorage({
        key: searchKey,
        value: JSON.stringify(currentShopEntity.value)
      })
    }
  }

  return { currentShop, currentShopEntity, currentShopGoods, initShopItems, deal }
})
