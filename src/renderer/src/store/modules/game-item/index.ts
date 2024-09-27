import { ShopGoodsRecord } from '@renderer/constants/data/shop'
import { SetupStoreId } from '@renderer/enums'
import { getCharacterName } from '@renderer/hooks/game/renpy'
import { createStorage, updateStorage } from '@renderer/service/api/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { initGameItems } from './shared'

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
  const totalGameItems: Array<Dto.GameItemFull> = initGameItems()

  function workbenchTableItems() {
    const workbenchTable: Array<Dto.EquipmentItemFull> = []
    totalGameItems
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
      const gameItem = totalGameItems.filter((x) => x.name == goods.name)[0]
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
    currentShop,
    setCurrentShop,
    currentShopEntity,
    currentShopGoods,
    deal,
    currentWorkbench,
    workbenchTableItems
  }
})
