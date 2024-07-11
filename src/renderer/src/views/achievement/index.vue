<template>
  <NFlex vertical>
    <NCard class="w-full text-center">
      <n-h3>成就(2/3)</n-h3>
    </NCard>
    <NFlex>
      <NCard title="帽子戏法" class="relative z-4 w-52 shadow-primary shadow-op-30">
        <template #header-extra>
          <n-tag type="info">R</n-tag>
        </template>
        <n-p class="text-center">
          <icon-streamline-emojis:game-dice class="w-32 h-32" />
        </n-p>
        <n-p>
          <n-icon v-for="index in totalStar" :key="index">
            <icon-solar:star-bold v-if="playerScore >= index" color="#fcc419" />
            <icon-solar:star-bold-duotone v-else />
          </n-icon>
        </n-p>
        <n-p>连续3次赢得骰子游戏</n-p>
        <n-p> <n-tag type="success"> 2024-07-10 </n-tag></n-p>
      </NCard>
      <NCard title="后发先制" class="relative z-4 w-52 shadow-primary shadow-op-30">
        <template #header-extra>
          <n-tag type="info">R</n-tag>
        </template>
        <n-p class="text-center">
          <icon-streamline:peace-hand class="w-32 h-32 color-primary" />
        </n-p>
        <n-p>
          <n-icon v-for="index in totalStar" :key="index">
            <icon-solar:star-bold v-if="playerScore >= index" color="#fcc419" />
            <icon-solar:star-bold-duotone v-else />
          </n-icon>
        </n-p>
        <n-p>只用三轮就取得猜拳胜利</n-p>
        <n-p> <n-tag type="success"> 2024-07-10 </n-tag></n-p>
      </NCard>
      <NCard title="初出茅庐" class="relative z-4 w-52 shadow-primary shadow-op-30 grayscale-100">
        <template #header-extra>
          <n-tag type="info">R</n-tag>
        </template>
        <n-p class="text-center">
          <icon-local-logo class="w-32 h-32" />
        </n-p>
        <n-p>
          <n-icon v-for="index in totalStar" :key="index">
            <icon-solar:star-bold v-if="playerScore >= index" color="#fcc419" />
            <icon-solar:star-bold-duotone v-else />
          </n-icon>
        </n-p>
        <n-p>简单介绍一下</n-p>
        <n-p> <n-tag type="warning" class="w-24"> 未解锁 </n-tag></n-p>
      </NCard>
    </NFlex>
  </NFlex>
</template>

<script setup>
import { ref } from 'vue';
// N R SR SSR
const totalStar = ref(5)
const playerScore = ref(3)
</script>

<style lang="scss" scoped>
.n-card:hover {
  box-shadow: 0px 0px 8px 6px var(--un-shadow-color);
}
</style>
