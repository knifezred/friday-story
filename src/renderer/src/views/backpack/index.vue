<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi :span="4">
      <n-empty v-if="shopItems.length == 0" size="large" :description="$t('common.empty')">
      </n-empty>
      <n-scrollbar v-else class="h-90vh">
        <n-flex>
          <template v-for="goods in shopItems" :key="goods.name">
            <n-card class="relative w-56 ma-2 shadow-primary shadow-op-30">
              <n-thing>
                <template #avatar>
                  <n-badge :value="goods.count">
                    <LevelAvatar :round="false" :size="64" :level="goods.level">
                      <ImageIcon :src="goods.cover" class="size-12" />
                    </LevelAvatar>
                  </n-badge>
                </template>
                <template #header>
                  <span class="pl-1 text-4 text-info"> {{ $t(goods.title) }}</span>
                </template>
                <template #description>
                  <n-p class="text-info-600">{{ $t(goods.desc) }} </n-p>
                </template>
              </n-thing>
            </n-card>
          </template>
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
  name: 'Backpack'
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
