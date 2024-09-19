<template>
  <n-split
    v-model:size="splitSize"
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :min="splitSize"
    :max="splitSize">
    <template #1>
      <GameWindow v-model:value="gameStore.sceneType" />
    </template>
    <template #2>
      <NFlex v-if="isShowMap" vertical class="pa-2 text-center">
        <n-divider>
          <n-tag type="primary" :bordered="false" class="text-xl">
            {{ formatTimestamp(archivedData.worldTime, 'YYYY-MM-DD HH:mm') }}
            <SvgIcon
              icon="meteocons:clear-day-fill"
              class="text-icon-xl inline-block mx-1 v-bottom" />
            {{ gameStore.temperature }}°
          </n-tag>
        </n-divider>
        <n-grid x-gap="12" y-gap="8" :cols="2">
          <n-gi>
            <n-statistic>
              <template #prefix>
                <icon-local-cash class="inline-block" />
              </template>
              <n-number-animation
                show-separator
                :from="gameStore.fromMoney"
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
                :from="gameStore.fromGold"
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
        <n-tag
          type="info"
          :bordered="false"
          class="text-xl pa-4 cursor-pointer"
          @click="mapFunc(mapStore.parentMap)">
          <icon-solar:point-on-map-bold-duotone />
          {{ mapStore.parentMap.title }}
        </n-tag>

        <n-scrollbar class="h-100vh" :distance="10">
          <Transition :name="projectSetting.mapTransition" mode="out-in" appear>
            <NFlex v-if="gameStore.sceneType == 'map'" :key="mapStore.currMap.pid" class="pl-2">
              <template v-for="item in mapStore.currLevelMaps" :key="item.id">
                <n-card
                  v-if="item.isShow"
                  :title="$t(item.title)"
                  class="w-31% text-center cursor-pointer"
                  header-class="pa-0.1em!"
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
                      v-if="item.next != undefined"
                      class="color-primary" />
                  </template>
                </n-card>
              </template>
            </NFlex>
          </Transition>
        </n-scrollbar>
      </NFlex>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import { projectSetting } from '@renderer/settings/projectSetting'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useGameStore } from '@renderer/store/modules/game'
import { useMapStore } from '@renderer/store/modules/game-map'
import { formatTimestamp } from '@renderer/utils/common'
import { ref, watch } from 'vue'
defineOptions({
  name: 'Home'
})
const appStore = useAppStore()
const mapStore = useMapStore()
const gameStore = useGameStore()
const { addMoney, addGold } = useGameStore()
const { nextMap } = useMapStore()
const { userInfo, archivedData, isStaticSuper } = useAuthStore()

const isShowMap = ref(false)
const splitSize = ref(0.675)

watch(
  [() => appStore.siderHidden],
  () => {
    isShowMap.value = !appStore.siderHidden
    splitSize.value = isShowMap.value ? 0.67 : 1
  },
  { immediate: true }
)
function mapFunc(map: Dto.MapItemFull) {
  if (gameStore.sceneType == 'map') {
    if (map.id == 'game.map.parent') {
      nextMap(map.next, map)
    } else {
      userInfo.archive.place = map.id
      mapStore.currMap = map
    }
  } else {
    window.$message?.info('in mini game,please wait game ended')
  }
}
</script>
