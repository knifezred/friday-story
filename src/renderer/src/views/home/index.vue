<template>
  <NSpace>
    <NCard :bordered="false" class="relative z-4 w-2xl rd-12px">
      <n-h3>猜拳</n-h3>
      <FingerGuessing></FingerGuessing>
    </NCard>
  </NSpace>
</template>

<script setup lang="ts">
import FingerGuessing from '@renderer/components/mini-games/finger-guessing/index.vue'
defineOptions({
  name: 'Home'
})
</script>

<style scoped></style>
