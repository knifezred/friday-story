<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled class="text-center">
    <n-gi :span="4">
      <n-empty v-if="shopItems.length == 0" size="large" :description="$t('common.empty')">
      </n-empty>
      <n-scrollbar v-else class="h-90vh">
        <n-flex>
          <n-card
            v-for="goods in shopItems"
            :key="goods.id"
            class="relative z-4 w-56 ma-1 shadow-primary shadow-op-30 hover-card">
            <n-flex>
              <n-badge :value="goods.count">
                <ImageIcon :src="goods.cover" class="w-16 h-16" />
              </n-badge>

              <n-flex vertical class="pl-1">
                <n-p class="my-0">
                  <LevelTag :level="goods.level" />
                  {{ $t(goods.title) }}
                </n-p>
                <n-p class="my-0"> {{ $t(goods.desc) }}</n-p>
              </n-flex>
            </n-flex>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ShopGoods } from '@renderer/constants/data/items'
import { useAuthStore } from '@renderer/store/modules/auth'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Inventory'
})

const shopItems = ref<Array<Dto.ShopGoods>>([])
const { archivedData } = useAuthStore()

onMounted(() => {
  shopItems.value = ShopGoods().filter(
    (x) => archivedData.items.filter((p) => p.id == x.id).length > 0
  )
  shopItems.value.forEach((item) => {
    item.count = archivedData.items.filter((x) => x.id == item.id)[0].count
  })
})
</script>

<style scoped></style>
