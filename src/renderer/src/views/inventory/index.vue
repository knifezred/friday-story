<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi :span="4">
      <n-empty v-if="shopItems.length == 0" size="large" :description="$t('common.empty')">
      </n-empty>
      <n-scrollbar v-else class="h-90vh">
        <n-flex>
          <n-card
            v-for="goods in shopItems"
            :key="goods.name"
            class="relative z-4 w-xs ma-1 shadow-primary shadow-op-30">
            <n-thing>
              <template #avatar>
                <ImageIcon :src="goods.cover" class="size-18" />
              </template>
              <template #header>
                <span class="text-4 text-info-500">
                  {{ $t(goods.title) }}
                  ({{ goods.count.toString() }})
                </span>
              </template>
              <template #header-extra>
                <LevelTag :level="goods.level" />
              </template>
              <template #description>
                <n-p class="my-1"> {{ $t(goods.desc) }}</n-p>
              </template>
              <template #action>
                <n-flex justify="space-around"> </n-flex>
              </template>
            </n-thing>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { DefaultGameItems } from '@renderer/constants/data/items'
import { useAuthStore } from '@renderer/store/modules/auth'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Inventory'
})

const shopItems = ref<Array<Dto.GameItemFull>>([])
const { archivedData } = useAuthStore()

onMounted(() => {
  shopItems.value = []
  DefaultGameItems.filter(
    (x) => archivedData.items.filter((p) => p.name == x.name).length > 0
  ).forEach((item) => {
    shopItems.value.push({
      ...item,
      title: item.title ?? '',
      desc: item.desc ?? '',
      cover: item.cover ?? '',
      count: archivedData.items.filter((x) => x.name == item.name)[0].count
    })
  })
})
</script>

<style scoped></style>
