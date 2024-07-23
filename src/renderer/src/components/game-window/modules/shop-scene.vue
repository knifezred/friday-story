<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi :span="4">
      <n-scrollbar class="h-80vh pl-2 pt-2">
        <n-flex class="ma-2">
          <n-card
            v-for="goods in shopItems"
            :key="goods.name"
            class="relative z-4 w-xs shadow-primary shadow-op-30">
            <n-flex>
              <n-grid y-gap="4" x-gap="2" :cols="3" class="mb-1">
                <n-gi>
                  <n-badge :value="goods.selectedCount">
                    <ImageIcon
                      :src="goods.cover"
                      class="size-18"
                      :class="getLevelBorder(goods.level)" />
                  </n-badge>
                </n-gi>
                <n-gi class="pl-4">
                  <LevelTag :level="goods.level" />
                  <n-tag type="info" :bordered="false" class="mt-2 w-10">
                    <template #icon>
                      <icon-local-money />
                    </template>
                  </n-tag>
                </n-gi>
                <n-gi>
                  <span class="mt-0.5 block"> {{ $t(goods.title) }}</span>

                  <span class="mt-4 block"> {{ $t(goods.price.toString()) }}</span>
                </n-gi>
              </n-grid>
            </n-flex>
            <n-p class="my-1"> {{ $t(goods.desc) }}</n-p>
            <template #action>
              <n-flex justify="space-around">
                <n-button :disabled="goods.selectedCount == 0" @click="removeToCart(goods)">
                  -1
                </n-button>
                <span class="mt-2">{{ goods.count }}</span>
                <n-button :disabled="goods.count == 0" @click="addToCart(goods)">+1</n-button>
              </n-flex>
            </template>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
    <n-gi :span="4" class="text-center">
      <n-button type="primary" class="w-sm text-white" @click="checkout"
        ><icon-solar:cart-large-3-bold-duotone class="size-8" /> （{{ totalCoast }}）</n-button
      >
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { getLevelBorder } from '@renderer/utils/common'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ShopScene'
})

const shopItems = ref<Array<Dto.ShopGoodsFull>>([])
const authStore = useAuthStore()
const appStore = useAppStore()
const gameItemStore = useGameItemStore()
const totalCoast = ref(0)
interface Emits {
  (e: 'result', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function addToCart(goods: Dto.ShopGoodsFull) {
  if (totalCoast.value > authStore.archivedData.money) {
    window.$message?.error('余额不足')
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
      goods.selectedCount = 0
    }
  })
  appStore.addMoney(-totalCoast.value)
  emit('result', true)
}

onMounted(() => {
  gameItemStore.ShopGoods().forEach((goods) => {
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
