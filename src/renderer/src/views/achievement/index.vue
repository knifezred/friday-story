<template>
  <NFlex vertical>
    <NCard class="w-full text-center">
      <n-h3>成就(2/3)</n-h3>
    </NCard>
    <NFlex>
      <NCard
        v-for="item in gameStore.getAchievements()"
        :key="item.name"
        :title="$t(item.title)"
        class="relative z-4 w-52 shadow-primary shadow-op-30"
        :class="item.locked ? 'grayscale-100' : ''">
        <template #header-extra>
          <LevelTag :level="item.level" />
        </template>
        <n-p class="text-center">
          <ImageIcon :src="item.cover" class="size-24 color-primary" />
        </n-p>
        <n-p>
          <n-icon v-for="index in totalStar" :key="index">
            <icon-solar:star-bold v-if="item.star >= index" color="#fcc419" />
            <icon-solar:star-bold-duotone v-else />
          </n-icon>
        </n-p>
        <n-p>{{ $t(item.desc) }}</n-p>
        <n-p>
          <n-tag v-if="item.locked" type="warning"> {{ $t('common.notUnlocked') }} </n-tag>
          <n-tag v-else type="success">
            {{ $t('common.unlocked') }}
          </n-tag>
        </n-p>
      </NCard>
    </NFlex>
  </NFlex>
</template>

<script setup lang="ts">
import { useGameStore } from '@renderer/store/modules/game'
import { ref } from 'vue'
// N R SR SSR
const totalStar = ref(5)
const gameStore = useGameStore()
</script>

<style lang="scss" scoped></style>
