<template>
  <n-split
    v-model:size="splitSize"
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :min="splitSize"
    :max="splitSize">
    <template #1>
      <GameWindow v-model:value="appStore.currentSceneType" />
    </template>
    <template #2>
      <NFlex v-if="isShowMap" vertical class="pa-2 text-center">
        <n-p>
          <n-tag type="primary" class="text-xl">
            {{ formatTimestamp(archivedData.worldTime, 'YYYY-MM-DD HH:mm') }}
          </n-tag>
          <SvgIcon
            icon="meteocons:clear-day-fill"
            class="text-icon-xl inline-block mx-1 v-bottom" />
        </n-p>
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-statistic>
              <template #prefix>
                <icon-local-cash class="inline-block" />
              </template>
              <n-number-animation
                show-separator
                :from="appStore.fromMoney"
                :to="archivedData.money" />
              <ButtonIcon
                v-if="isStaticSuper"
                icon="solar:cash-out-line-duotone"
                class="mx-1"
                tooltip-content="+100000"
                tooltip-placement="top"
                @click="addMoney(100000)" />
            </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic>
              <template #prefix>
                <icon-local-gold class="inline-block" />
              </template>
              <n-number-animation
                show-separator
                :from="appStore.fromGold"
                :to="archivedData.gold" />
              <ButtonIcon
                v-if="isStaticSuper"
                icon="solar:cash-out-line-duotone"
                class="mx-1"
                tooltip-content="+100"
                tooltip-placement="top"
                @click="addGold(100)" />
            </n-statistic>
          </n-gi>
        </n-grid>
        <n-scrollbar class="h-100vh" :distance="10">
          <NFlex>
            <n-card
              v-for="item in mapStore.currLevelMaps"
              :key="item.id"
              :title="$t(item.title)"
              class="w-9.2vw text-center cursor-pointer map-card"
              size="small"
              hoverable
              @click="mapFunc(item)">
              <template #cover>
                <image-icon :src="item.cover" />
              </template>
              <template #header-extra>
                <icon-solar:user-bold-duotone
                  v-if="item.id == mapStore.currMap.id"
                  class="color-primary" />
                <icon-solar:exit-line-duotone
                  v-if="item.nextId != undefined"
                  class="color-primary" />
              </template>
            </n-card>
          </NFlex>
        </n-scrollbar>
      </NFlex>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { usePlaceStore } from '@renderer/store/modules/place'
import { formatTimestamp } from '@renderer/utils/common'
import { onMounted, ref, watch } from 'vue'
defineOptions({
  name: 'Home'
})
const appStore = useAppStore()
const mapStore = usePlaceStore()
const { addMoney, addGold } = useAppStore()
const { reloadMap, beforeNextMap } = usePlaceStore()
const { userInfo, archivedData, isStaticSuper } = useAuthStore()

const isShowMap = ref(false)
const splitSize = ref(1)

watch(
  [() => appStore.siderCollapse],
  () => {
    isShowMap.value = !appStore.siderCollapse
    if (appStore.siderCollapse) {
      splitSize.value = isShowMap.value ? 0.59 : 1
    } else {
      splitSize.value = isShowMap.value ? 0.675 : 1
    }
  },
  { immediate: true }
)
function mapFunc(map: Dto.MapItem) {
  beforeNextMap(map)
  if (appStore.currentSceneType === 'map') {
    if (map.nextId != undefined) {
      reloadMap(map.nextId, map.pid)
    } else {
      userInfo.archive.place = map.id
      mapStore.currMap = map
    }
  } else {
    window.$message?.info('in mini game,please wait game ended')
  }
}

onMounted(() => {
  // 初始化地图
  mapStore.initMap(userInfo.archive.place)
})

// story 故事
// plot 剧情
</script>
