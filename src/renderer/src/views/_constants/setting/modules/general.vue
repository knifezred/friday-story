<template>
  <NSpace>
    <NCard :bordered="false" class="relative z-4 w-2xl rd-12px">
      <template #cover>
        <ImageIcon icon="/static/imgs/t0.webp" />
      </template>
      <n-h3>标题</n-h3>
      <n-p>Hello world</n-p>
    </NCard>
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px text-center">
      <icon-local-logo class="w-32 h-32" />
      <n-divider />
      <NAlert title="Home page" type="info" :bordered="false"></NAlert>
    </NCard>
  </NSpace>
</template>

<script setup lang="ts"></script>

<style scoped></style>
