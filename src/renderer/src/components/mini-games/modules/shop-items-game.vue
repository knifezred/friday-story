<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled class="text-center">
    <n-gi :span="4">
      <n-scrollbar class="h-80vh">
        <n-flex justify="left">
          <n-card
            v-for="goods in shopItems"
            :key="goods.id"
            class="relative z-4 w-56 ma-2 shadow-primary shadow-op-30">
            <n-flex>
              <n-badge :value="goods.selectedCount">
                <ImageIcon :src="goods.cover" class="w-16 h-16" />
              </n-badge>
              <n-p>
                <LevelTag :level="goods.level" />
                {{ $t(goods.title) }}
                <br />
                {{ $t(goods.desc) }}
              </n-p>
            </n-flex>
            <template #action>
              <n-button :disabled="goods.selectedCount == 0" @click="removeToCart(goods)">
                -1
              </n-button>
              <span class="w-10 inline-block">{{ goods.count }}</span>
              <n-button :disabled="goods.count == 0" @click="addToCart(goods)">+1</n-button>
            </template>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
    <n-gi :span="4"> <n-button type="primary" class="w-sm" @click="checkout">结算</n-button> </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { DefaultShopGoods } from '@renderer/constants/data/items'
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ShopItemsGame'
})
const shopItems = ref<Array<Dto.ShopGoods>>([])
const authStore = useAuthStore()
const appStore = useAppStore()
const totalCoast = ref(0)
interface Emits {
  (e: 'game-result', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function addToCart(goods: Dto.ShopGoods) {
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
function removeToCart(goods: Dto.ShopGoods) {
  if (goods.selectedCount > 0) {
    goods.count++
    goods.selectedCount--
    totalCoast.value -= goods.price
  }
}

function checkout() {
  shopItems.value.forEach((goods) => {
    if (goods.selectedCount > 0) {
      if (authStore.archivedData.items.filter((x) => x.id == goods.id).length > 0) {
        authStore.archivedData.items.filter((x) => x.id == goods.id)[0].count += goods.selectedCount
      } else {
        authStore.archivedData.items.push({
          id: goods.id,
          count: goods.selectedCount
        })
      }
      goods.selectedCount = 0
    }
  })
  appStore.addMoney(-totalCoast.value)
  emit('game-result', true)
}

onMounted(() => {
  shopItems.value = DefaultShopGoods
  shopItems.value.forEach((item) => {
    item.desc = 'items.' + item.type + '.' + item.name + '.desc'
    item.title = 'items.' + item.type + '.' + item.name + '.title'
    item.cover = '/static/items/' + item.type + '/' + item.name.replaceAll('.', '/') + '.png'
  })
})
</script>

<style lang="css">
.n-card:hover {
  box-shadow: 0px 0px 8px 6px var(--un-shadow-color);
}
.n-card__action {
  padding: 1em !important;
}
</style>
