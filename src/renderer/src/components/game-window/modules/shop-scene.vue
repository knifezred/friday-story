<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="5" layout-shift-disabled class="mt-2">
    <n-gi :span="1" class="text-center">
      <n-p class="pt-4">
        <ImageIcon :src="gameItemStore.currentShopEntity.managerAvatar" />
        <n-tag :bordered="false" type="success">
          {{ $t(gameItemStore.currentShopEntity.manager) }}:
          {{ gameItemStore.currentShopEntity.money }}
        </n-tag>
      </n-p>
    </n-gi>
    <n-gi :span="2">
      <n-card>
        <n-tag :bordered="false" type="primary" class="text-8 text-center h-10 block">
          {{ $t(gameItemStore.currentShopEntity.name) }}
        </n-tag>
        <n-scrollbar class="h-68vh pl-2 pt-2">
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
      </n-card>
    </n-gi>
    <n-gi :span="2" class="pr-4">
      <n-card>
        <n-tag :bordered="false" type="primary" class="text-8 text-center h-10 block">
          {{ $t(authStore.userInfo.username) }}
        </n-tag>
        <n-scrollbar class="h-68vh pl-2 pt-2">
          <n-flex class="ma-2">
            <template v-for="goods in userItems" :key="goods.name">
              <n-card class="relative w-auto ma-2 shadow-primary shadow-op-30">
                <n-thing>
                  <template #avatar>
                    <n-badge :value="goods.count">
                      <LevelAvatar :round="false" :size="64" :level="goods.level">
                        <ImageIcon :src="goods.cover" class="size-12" />
                      </LevelAvatar>
                    </n-badge>
                  </template>
                  <!-- <template #header>
                    <span class="pl-1 text-4 text-info"> {{ $t(goods.title) }}</span>
                  </template> -->
                  <p class="pl-1 text-4 text-info">{{ $t(goods.title) }}</p>
                </n-thing>
              </n-card>
            </template>
          </n-flex>
        </n-scrollbar>
      </n-card>
    </n-gi>
    <n-gi :span="1"></n-gi>
    <n-gi :span="4" class="pr-8">
      <n-space justify="end">
        <n-button type="primary" class="w-48" size="large" @click="checkout">
          <icon-solar:cart-large-3-bold-duotone class="size-4 color-white" />
          （{{ totalCoast }}）
        </n-button>
        <n-button type="primary" class="w-48" size="large" @click="resetDeal">
          {{ $t('common.reset') }}
        </n-button>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { DefaultGameItems } from '@renderer/constants/data/items'
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
      if (userItems.value.filter((x) => x.name == goods.name).length > 0) {
        userItems.value.filter((x) => x.name == goods.name)[0].count += 1
      } else {
        userItems.value.push({
          name: goods.name,
          count: 1,
          title: goods.title ?? '',
          desc: goods.desc ?? '',
          cover: goods.cover ?? '',
          type: goods.type,
          level: goods.level
        })
      }
    }
  }
}
function removeToCart(goods: Dto.ShopGoodsFull) {
  if (goods.selectedCount > 0) {
    goods.count++
    goods.selectedCount--
    totalCoast.value -= goods.price
    if (userItems.value.filter((x) => x.name == goods.name).length > 0) {
      userItems.value.filter((x) => x.name == goods.name)[0].count -= 1
    }
  }
}

function checkout() {
  shopItems.value.forEach((goods) => {
    if (goods.selectedCount > 0) {
      const itemToUpdate = authStore.archivedData.items.find((x) => x.name === goods.name)
      if (itemToUpdate) {
        itemToUpdate.count += goods.selectedCount
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

function resetDeal() {
  shopItems.value.forEach((goods) => {
    if (goods.selectedCount > 0) {
      const itemToUpdate = userItems.value.find((x) => x.name === goods.name)
      if (itemToUpdate) {
        itemToUpdate.count -= goods.selectedCount
        if (itemToUpdate.count <= 0) {
          userItems.value = userItems.value.filter((x) => x.count > 0)
        }
      }
      goods.count += goods.selectedCount
      goods.selectedCount = 0
    }
  })
}

const userItems = ref<Array<Dto.GameItemFull>>([])

function loadUserItems() {
  DefaultGameItems.filter(
    (x) => authStore.archivedData.items.filter((p) => p.name == x.name).length > 0
  ).forEach((item) => {
    userItems.value.push({
      ...item,
      title: item.title ?? '',
      desc: item.desc ?? '',
      cover: item.cover ?? '',
      count: authStore.archivedData.items.filter((x) => x.name == item.name)[0].count
    })
  })
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
  loadUserItems()
})
</script>

<style lang="css" scoped></style>
