<template>
  <NFlex vertical>
    <NCard class="w-full text-center">
      <n-h3>{{ $t('route.relationship') }}</n-h3>
      <n-flex justify="center">
        <LevelTag />
        <LevelTag level="N" />
        <LevelTag level="R" />
        <LevelTag level="SR" />
        <LevelTag level="SSR" />
      </n-flex>
    </NCard>
    <NFlex>
      <NCard
        v-for="item in npcItems"
        :key="item.id"
        class="relative z-4 w-100 shadow-primary shadow-op-30"
        :class="item.isLocked ? 'grayscale-100' : ''">
        <n-flex v-if="item.isLocked">
          <n-p class="text-center">
            <ImageIcon src="/static/imgs/avatar/default.svg" class="w-36" />
          </n-p>
          <n-flex vertical>
            <n-p class="my-0"> <LevelTag />陌生人 </n-p>
            <n-p class="my-0"> 尚未解锁 </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
          </n-flex>
        </n-flex>
        <n-flex v-else>
          <n-p class="text-center">
            <ImageIcon :src="item.avatar" class="w-36" />
          </n-p>
          <n-flex vertical>
            <n-p class="my-0"> <LevelTag :level="item.level" />{{ item.name }} </n-p>
            <n-p class="my-0"> {{ item.desc }} </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="item.relationship[0] >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="item.relationship[1] >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
            <n-p class="my-0">
              友好：
              <n-icon v-for="index in relationLevel" :key="index" :size="20">
                <icon-solar:heart-bold v-if="item.relationship[2] >= index" color="#fa5252" />
                <icon-solar:heart-bold-duotone v-else />
              </n-icon>
            </n-p>
          </n-flex>
        </n-flex>
      </NCard>
    </NFlex>
  </NFlex>
</template>

<script setup lang="ts">
import { DefaultNpcInfoList } from '@renderer/constants/data/npc'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'Relationship'
})
const relationLevel = ref(5)
const npcItems = ref<Array<Dto.NpcInfo>>()
// N R SR SSR
onMounted(() => {
  npcItems.value = DefaultNpcInfoList
})
</script>

<style lang="css">
.n-card:hover {
  box-shadow: 0px 0px 8px 6px var(--un-shadow-color);
}
</style>
