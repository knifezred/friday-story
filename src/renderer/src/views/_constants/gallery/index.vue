<template>
  <NFlex vertical>
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px text-center">
      <image-icon :src="'/static/images/' + auth.userInfo.archive.cover" class="size-32" />
      <n-h2 class="my-2"> {{ auth.userInfo.username }}</n-h2>
    </NCard>
    <n-carousel effect="card" :show-dots="false" style="height: 60%">
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t0.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t1.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t2.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t3.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t4.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t5.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t6.webp')" />
      </n-carousel-item>
      <n-carousel-item style="width: 60%">
        <n-image class="carousel-img" :src="staticPath('/static/demo/t7.webp')" />
      </n-carousel-item>
    </n-carousel>
  </NFlex>
</template>

<script setup lang="ts">
import { useAuthStore } from '@renderer/store/modules/auth'
import { staticPath } from '@renderer/utils/common'
const auth = useAuthStore()
</script>
<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
