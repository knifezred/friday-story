import { DefaultGameItems, ShopGoodsRecord } from '@renderer/constants/data/items'
import { EquipmentItems } from '@renderer/constants/data/items/equipment'
import { SetupStoreId } from '@renderer/enums'
import { createStorage, updateStorage } from '@renderer/service/api/storage'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'

export const useGameItemStore = defineStore(SetupStoreId.GameItem, () => {
  const authStore = useAuthStore()
  const isUpdate = ref(false)
  const currentShop = ref('')
  const currentShopEntity = ref<Dto.ShopEntity>({
    name: '',
    manager: '',
    money: 0,
    goods: []
  })
  const currentWorkbench = ref('')

  function workbenchTableItems() {
    const workbenchTable: Array<Dto.EquipmentItemFull> = []
    EquipmentItems.forEach((item) => {
      const equipment: Dto.EquipmentItemFull = {
        ...item,
        name: item.type + '.' + item.name,
        desc: localeText(item.desc, item.name, 'game.items', 'desc'),
        title: localeText(item.title, item.name, 'game.items', 'title'),
        cover: prefixImage(item.cover, item.name, 'items', '.png'),
        count: item.count ?? 1,
        material: item.material ?? [],
        selectedCount: 0
      }
      workbenchTable.push(equipment)
    })
    return workbenchTable
  }

  async function currentShopGoods() {
    // 分存档保存
    const shopEntity = await authStore.findStorageData(SetupStoreId.GameItem + currentShop.value)
    if (shopEntity != null && shopEntity.data != null && typeof shopEntity.data != 'string') {
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
      item.desc = localeText(item.desc, item.name, 'game.items', 'desc')
      item.title = localeText(item.title, item.name, 'game.items', 'title')
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

  return {
    currentShop,
    currentShopEntity,
    currentShopGoods,
    initShopItems,
    deal,
    currentWorkbench,
    workbenchTableItems
  }
})
