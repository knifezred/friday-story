import { GameItemCollections } from '@renderer/constants/data/items'
import { ShopGoodsRecord } from '@renderer/constants/data/shop'
import { SetupStoreId } from '@renderer/enums'
import { getCharacterName } from '@renderer/hooks/game/renpy'
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
    goods: [],
    managerAvatar: ''
  })
  const currentWorkbench = ref('')
  const totalGameItems = ref<Array<Dto.GameItemFull>>([])

  function initTotalGameItems() {
    totalGameItems.value = []
    GameItemCollections.forEach((co) => {
      co.items.forEach((item) => {
        item.type = co.type
        item.name = co.type + '.' + item.name
        totalGameItems.value.push({
          ...item,
          desc: localeText(item.desc, item.name, 'game.items', 'desc'),
          title: localeText(item.title, item.name, 'game.items', 'title'),
          cover: prefixImage(item.cover, item.name, 'items', '.png'),
          type: co.type,
          count: item.count ?? -1
        })
      })
    })
  }

  function workbenchTableItems() {
    const workbenchTable: Array<Dto.EquipmentItemFull> = []
    totalGameItems.value
      .filter((x) => x.type == 'equipment')
      .forEach((item) => {
        const equipment: Dto.EquipmentItemFull = {
          ...item,
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
      currentShopEntity.value = ShopGoodsRecord[currentShop.value.split('#')[0]]
      currentShopEntity.value.manager = getCharacterName(currentShopEntity.value.manager)
      isUpdate.value = false
    }
    currentShopEntity.value.goods.forEach((goods) => {
      if (goods.name.indexOf('.') == -1) {
        goods.name = goods.type + '.' + goods.name
      }
      const gameItem = totalGameItems.value.filter((x) => x.name == goods.name)[0]
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

  function setCurrentShop(mapId: string, shopId: string) {
    currentShop.value = shopId + '#' + mapId
  }

  return {
    totalGameItems,
    initTotalGameItems,
    currentShop,
    setCurrentShop,
    currentShopEntity,
    currentShopGoods,
    deal,
    currentWorkbench,
    workbenchTableItems
  }
})
