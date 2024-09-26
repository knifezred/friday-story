<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled class="mt-2">
    <n-gi :span="3">
      <n-scrollbar class="h-78vh pl-2 pt-2">
        <n-flex class="ma-2">
          <n-card
            v-for="goods in shopItems"
            :key="goods.name"
            class="relative z-4 w-64 shadow-primary shadow-op-30">
            <n-thing>
              <template #avatar>
                <n-badge :value="goods.selectedCount">
                  <LevelAvatar :round="false" :size="64" :level="goods.level">
                    <ImageIcon :src="goods.cover" class="size-12" />
                  </LevelAvatar>
                </n-badge>
              </template>
              <template #header>
                <span class="pl-1 text-4 text-info"> {{ $t(goods.title) }}</span>
              </template>
              <template #description>
                <n-tag type="info" :bordered="false">
                  <template #icon>
                    <icon-local-money />
                  </template>
                  {{ $t(goods.price.toString()) }}
                </n-tag>
              </template>
              <n-p class="text-info-600">{{ $t(goods.desc) }} </n-p>
              <template #action>
                <n-flex justify="space-around">
                  <n-button :disabled="goods.selectedCount == 0" @click="removeToCart(goods)">
                    -1
                  </n-button>
                  <span class="mt-2">{{ goods.count }}</span>
                  <n-button :disabled="goods.count == 0" @click="addToCart(goods)">+1</n-button>
                </n-flex>
              </template>
            </n-thing>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
    <n-gi :span="1" class="text-center">
      <n-h1 class="text-primary-500 mb-0"> {{ $t(gameItemStore.currentShopEntity.name) }}</n-h1>
      <n-p class="pt-4">
        <n-tag :bordered="false" type="success">
          {{ $t(gameItemStore.currentShopEntity.manager) }}:
          {{ gameItemStore.currentShopEntity.money }}
        </n-tag>
      </n-p>
      <n-button type="primary" class="w-48 h-12" @click="checkout">
        <icon-solar:cart-large-3-bold-duotone class="size-8 color-white" />
        （{{ totalCoast }}）
      </n-button>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useGameStore } from '@renderer/store/modules/game'
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ShopScene'
})

const shopItems = ref<Array<Dto.ShopGoodsFull>>([])
const authStore = useAuthStore()
const gameStore = useGameStore()
const gameItemStore = useGameItemStore()
const totalCoast = ref(0)
interface Emits {
  (e: 'result', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function addToCart(goods: Dto.ShopGoodsFull) {
  if (totalCoast.value > authStore.archivedData.money) {
    window.$message?.error($t('game.message.notEnoughMoney'))
  } else {
    if (goods.count > 0) {
      goods.count--
      goods.selectedCount++
      totalCoast.value += goods.price
    }
  }
}
function removeToCart(goods: Dto.ShopGoodsFull) {
  if (goods.selectedCount > 0) {
    goods.count++
    goods.selectedCount--
    totalCoast.value -= goods.price
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
  gameItemStore.deal(totalCoast.value)
  gameStore.addMoney(-totalCoast.value)
  emit('result', true)
}

onMounted(async () => {
  ;(await gameItemStore.currentShopGoods()).forEach((goods) => {
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
