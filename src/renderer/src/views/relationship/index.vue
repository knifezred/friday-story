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
        :key="item.name"
        class="relative z-4 w-sm shadow-primary shadow-op-30"
        :class="item.isLocked ? 'grayscale-100' : ''">
        <template #header>
          <span class="text-4 text-amber">
            {{
              item.isLocked != true
                ? $t(item.username) + ' (' + $t(item.nickname) + ')'
                : $t('page.relationship.stranger')
            }}
          </span>
        </template>
        <template #header-extra>
          <LevelTag :level="item.level" />
        </template>
        <n-popover :overlap="true" placement="bottom" trigger="hover">
          <template #trigger>
            <ImageIcon :src="item.avatar" class="w-sm rd-xl" />
          </template>
          <n-flex vertical class="w-xs">
            <template v-if="item.isLocked">
              <n-p class="my-0"> {{ $t('page.relationship.beforeSeen') }} </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="0 >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
            </template>
            <template v-else>
              <n-p class="my-0"> {{ $t(item.desc) }} </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="item.relationship[0] >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="item.relationship[1] >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
              <n-p class="my-0">
                {{ $t('page.relationship.friendly') }}
                <n-icon v-for="index in relationLevel" :key="index" :size="20">
                  <icon-solar:heart-bold v-if="item.relationship[2] >= index" color="#fa5252" />
                  <icon-solar:heart-bold-duotone v-else />
                </n-icon>
              </n-p>
            </template>
          </n-flex>
        </n-popover>
      </NCard>
    </NFlex>
  </NFlex>
</template>

<script setup lang="ts">
import { useNpcStore } from '@renderer/store/modules/game-npc'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'Relationship'
})
const relationLevel = ref(5)
const npcItems = ref<Array<Dto.NpcFull>>()
const npcStore = useNpcStore()
// N R SR SSR
onMounted(() => {
  npcItems.value = npcStore.allNPCs
})
</script>

<style lang="css"></style>
