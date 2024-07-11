<template>
  <NFlex vertical>
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px text-center">
      <image-icon :src="'/static/imgs/' + auth.userInfo.archive.cover" class="w-32 h-32" />
      <n-h2 class="my-2"> {{ auth.userInfo.userName }}</n-h2>
      <n-flex class="text-center" justify="center">
        <n-tag>成就1</n-tag>
        <n-tag>成就2</n-tag>
        <n-tag>成就3</n-tag>
      </n-flex>
    </NCard>
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
      <n-gi span="3">
        <NCard class="w-auto" title="成就">left</NCard>
      </n-gi>
      <n-gi>
        <NCard class="w-auto" title="任务">right</NCard>
      </n-gi>
      <n-gi>
        <NCard class="w-auto" title="日志">left</NCard>
      </n-gi>
      <n-gi span="3">
        <NCard class="w-auto" title="关系">right</NCard>
      </n-gi>
    </n-grid>
  </NFlex>
</template>

<script setup lang="ts">
import { useAuthStore } from '@renderer/store/modules/auth'
const auth = useAuthStore()
</script>

<style scoped></style>
