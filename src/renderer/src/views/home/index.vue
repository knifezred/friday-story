<template>
  <n-split
    v-model:size="splitSize"
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :min="splitSize"
    :max="splitSize">
    <template #1>
      <NFlex v-if="!isShowMiniGame" vertical :size="0">
        <UiScene :map="mapStore.currMap" />
        <n-card
          class="w-full bg-primary bg-op-30"
          :class="isShowMap ? 'pos-relative' : 'pos-fixed bottom-0'"
          :style="appStore.siderCollapse ? 'height:20.5vw' : 'height:18vw'"
          style="border: 0; border-radius: 0">
          <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
            <n-p class="text-xl">
              {{ $t(currentText) }}
            </n-p>
          </n-scrollbar>
          <template #footer>
            <n-flex>
              <n-button
                v-for="btn in actionButtons"
                :key="btn.id"
                :type="btn.type"
                :is-disabled="btn.isDisabled"
                :is-show="btn.isShow"
                class="color-white w-40"
                @click="actionFunc(btn)">
                <SvgIcon v-if="btn.icon != undefined" :icon="btn.icon" class="mr-1" />
                {{ btn.text }}
              </n-button>
            </n-flex>
          </template>
        </n-card>
      </NFlex>
      <MiniGame v-else :module="miniGameModule" @game-result="gameResult" />
    </template>
    <template #2>
      <NFlex v-if="isShowMap" vertical class="pa-2 text-center">
        <n-p>
          <n-tag type="primary">
            {{ formatTimestamp(archivedData.worldTime, 'YYYY-MM-DD HH:mm') }}
          </n-tag>
          <SvgIcon icon="fluent-emoji:sun" class="text-icon-xl inline-block mx-1 v-bottom" />
        </n-p>
        <n-flex>
          <n-statistic>
            <template #prefix>
              <icon-local-cash class="inline-block" />
            </template>
            <n-number-animation show-separator :from="moneyOldNumber" :to="archivedData.money" />
            <ButtonIcon
              v-if="isStaticSuper"
              icon="solar:cash-out-line-duotone"
              text
              tooltips="Add Money"
              class="mx-2"
              @click="addMoney(100000)" />
          </n-statistic>
          <n-statistic>
            <template #prefix>
              <icon-local-gold class="inline-block" />
            </template>
            <n-number-animation show-separator :from="goldOldNumber" :to="archivedData.gold" />
            <ButtonIcon
              v-if="isStaticSuper"
              icon="solar:cash-out-line-duotone"
              text
              tooltips="Add Money"
              class="mx-2"
              @click="addGold(100)" />
          </n-statistic>
        </n-flex>
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
                  v-if="item.jumpId != undefined"
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
import MiniGame from '@renderer/components/mini-games/index.vue'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { useMapStore } from '@renderer/store/modules/map'
import { formatTimestamp } from '@renderer/utils/common'
import { onMounted, ref, watch } from 'vue'
defineOptions({
  name: 'Home'
})
const appStore = useAppStore()
const mapStore = useMapStore()
const { reloadMap } = useMapStore()
const { userInfo, archivedData, isStaticSuper } = useAuthStore()
const moneyOldNumber = ref(0)
const goldOldNumber = ref(0)
const actionButtons = ref<Array<Dto.ActionButton>>([])
const currentText = ref('')
const isShowMap = ref(false)
const isShowMiniGame = ref(false)
const miniGameModule = ref<UnionKey.MiniGameModule>('finger-guessing')
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
function actionFunc(action: Dto.ActionButton) {
  if (action.miniGame != undefined) {
    isShowMiniGame.value = true
    miniGameModule.value = action.miniGame
  } else {
    nextText()
    coastTime(60)
    addMoney(1000)
  }
}
function coastTime(minutes: number) {
  archivedData.worldTime += minutes * 60 * 1000
}
function addMoney(money: number) {
  moneyOldNumber.value = archivedData.money
  archivedData.money = archivedData.money + money
}
function addGold(gold: number) {
  goldOldNumber.value = archivedData.gold
  archivedData.gold = archivedData.gold + gold
}

function gameResult(result) {
  isShowMiniGame.value = false
  currentText.value = 'game result:' + result
}
function nextText() {
  currentText.value = 'next text todo'
}

function mapFunc(map: Dto.MapItem) {
  if (map.jumpId != undefined) {
    reloadMap(map.jumpId, map.pid)
    currentText.value = map.text
  } else {
    if (!isShowMiniGame.value) {
      userInfo.archive.place = map.id
      mapStore.currMap = map
      currentText.value = map.text
    } else {
      window.$message?.info('in mini game,please wait game ended')
    }
  }
}

onMounted(() => {
  // 初始化地图
  mapStore.initMap(userInfo.archive.place)
  // 初始化操作按钮
  actionButtons.value.push(
    {
      id: 1,
      text: '石头剪刀布',
      icon: 'fluent-emoji:victory-hand',
      type: 'primary',
      isDisabled: false,
      isShow: true,
      miniGame: 'finger-guessing'
    },
    {
      id: 2,
      text: '掷骰子',
      icon: 'streamline-emojis:game-dice',
      type: 'error',
      isDisabled: false,
      isShow: true,
      miniGame: 'dice-number'
    },
    {
      id: 3,
      text: '工作',
      type: 'primary',
      isDisabled: false,
      isShow: true
    }
  )
})

// map 地图
// story 故事
// plot 剧情
// branch-line 主线
// main-line 支线
// unit-plot 单元剧
</script>
