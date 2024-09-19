<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi :span="4">
      <n-scrollbar class="h-78vh pl-2 pt-2">
        <n-flex class="ma-2">
          <n-card
            v-for="goods in shopItems"
            :key="goods.name"
            class="relative z-4 w-92 shadow-primary shadow-op-30">
            <n-thing>
              <template #avatar>
                <n-badge :value="goods.selectedCount">
                  <ImageIcon :src="goods.cover" class="size-18" />
                </n-badge>
              </template>
              <template #header>
                <span class="text-4 text-info"> {{ $t(goods.title) }}</span>
              </template>
              <template #header-extra>
                <LevelTag :level="goods.level" />
              </template>
              <template #description>
                <n-tag type="info" :bordered="false">
                  <template #icon>
                    <icon-local-money />
                  </template>
                </n-tag>
              </template>
              <n-p class="text-info-600">{{ $t(goods.desc) }} </n-p>
              <template #action>
                <n-flex justify="space-around">
                  <n-button :disabled="goods.selectedCount == 0" @click="removeToBuild(goods)">
                    -1
                  </n-button>
                  <span class="mt-2">{{ goods.count }}</span>
                  <n-button :disabled="goods.count == 0" @click="addToBuild(goods)">+1</n-button>
                </n-flex>
              </template>
            </n-thing>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
    <n-gi :span="4" class="text-center">
      <n-button type="primary" class="w-48 h-12" @click="checkout">
        <icon-solar:sledgehammer-bold-duotone class="size-8 color-white" />
        （{{ buildCount }}）
      </n-button>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ShopScene'
})

const shopItems = ref<Array<Dto.EquipmentItemFull>>([])
const authStore = useAuthStore()
const appStore = useAppStore()
const gameItemStore = useGameItemStore()
const buildCount = ref(0)
interface Emits {
  (e: 'result', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function addToBuild(goods: Dto.EquipmentItemFull) {
  if (buildCount.value > authStore.archivedData.money) {
    window.$message?.error($t('game.message.notEnoughMoney'))
  } else {
    if (goods.count > 0) {
      goods.count--
      goods.selectedCount++
      buildCount.value++
    }
  }
}
function removeToBuild(goods: Dto.EquipmentItemFull) {
  if (goods.selectedCount > 0) {
    goods.count++
    goods.selectedCount--
    buildCount.value--
  }
}

function checkout() {
  shopItems.value.forEach((goods) => {
    if (goods.selectedCount > 0) {
      if (authStore.archivedData.items.filter((x) => x.name == goods.name).length > 0) {
        authStore.archivedData.items.filter((x) => x.name == goods.name)[0].count +=
          goods.selectedCount
      } else {
        authStore.archivedData.items.push({
          name: goods.name,
          count: goods.selectedCount
        })
      }
      gameItemStore.currentShopEntity.goods.filter((x) => x.name == goods.name)[0].count =
        goods.count
      goods.selectedCount = 0
    }
  })
  emit('result', true)
}

onMounted(async () => {
  gameItemStore.workbenchTableItems().forEach((goods) => {
    shopItems.value.push({
      ...goods,
      name: goods.name ?? '',
      title: goods.title ?? '',
      desc: goods.desc ?? '',
      cover: goods.cover ?? '',
      type: goods.type ?? 'food',
      level: goods.level ?? 'N',
      selectedCount: goods.selectedCount ?? 0
    })
  })
})
</script>

<style lang="css" scoped></style>
