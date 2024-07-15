<template>
  <n-split
    v-model:size="splitSize"
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :min="splitSize"
    :max="splitSize">
    <template #1>
      <NFlex vertical :size="0">
        <UiScene :map="currentMap" />
        <n-card
          class="w-full bg-gray-800 bg-op-30"
          :class="isShowMap ? 'pos-relative' : 'pos-fixed bottom-0'"
          :style="appStore.siderCollapse ? 'height:20.5vw' : 'height:17.8vw'"
          style="border: 0; border-radius: 0">
          <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
            <n-p class="text-xl color-white">
              {{ $t(storyTextRecord[currentMap.text]) }}
            </n-p>
          </n-scrollbar>
          <template #footer>
            <n-button-group class="w-full">
              <n-button
                v-for="btn in actionButtons"
                :key="btn.id"
                :type="btn.type"
                :is-disabled="btn.isDisabled"
                :is-show="btn.isShow"
                @click="actionFunc(btn)">
                <SvgIcon v-if="btn.icon != ''" :icon="btn.icon" class="mr-1" />
                {{ btn.text }}
              </n-button>
            </n-button-group>
          </template>
        </n-card>
      </NFlex>
    </template>
    <template #2>
      <NFlex v-if="isShowMap" vertical class="pa-2 text-center">
        <n-p>
          <icon-wi:day-sunny class="size-8" />
          <n-tag type="primary"> {{ formatTimestamp(worldTime) }}</n-tag>
          <button-icon text icon="mynaui:plus-square" class="icon-vertical mx-1"> </button-icon>
        </n-p>
        <n-statistic label="" tabular-nums>
          <template #prefix>💴</template>
          <n-number-animation show-separator :from="0" :to="12039" />
        </n-statistic>
        <n-scrollbar class="h-100vh" :distance="10">
          <NFlex>
            <n-card
              v-for="item in mapItems"
              :key="item.id"
              :title="item.title"
              class="w-9.2vw text-center cursor-pointer map-card"
              size="small"
              hoverable
              @click="mapFunc(item)">
              <template #cover>
                <image-icon :src="item.cover" />
              </template>
              <template #header-extra>
                <icon-solar:user-bold-duotone
                  v-if="item.id == currentMap.id"
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
import { storyTextRecord } from '@renderer/constants/text'
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { formatTimestamp } from '@renderer/utils/common'
import { onMounted, ref, watch } from 'vue'
defineOptions({
  name: 'Home'
})
const worldTime = ref(Date.now())
const mapItems = ref<Array<UI.MapItem>>([])
const actionButtons = ref<Array<UI.ActionButton>>([])
const isShowMap = ref(false)
const splitSize = ref(1)
const currentMap = ref<UI.MapItem>({
  id: 0,
  title: 'test',
  text: 'text1',
  cover: '/static/imgs/t1.webp',
  video: '',
  icon: '',
  isDisabled: false,
  isShow: false,
  level: 0
})
const { userInfo } = useAuthStore()
const appStore = useAppStore()
function showMap() {
  isShowMap.value = !isShowMap.value
  if (appStore.siderCollapse) {
    splitSize.value = isShowMap.value ? 0.59 : 1
  } else {
    splitSize.value = isShowMap.value ? 0.675 : 1
  }
}
watch(
  [() => appStore.siderCollapse],
  () => {
    if (appStore.siderCollapse) {
      splitSize.value = isShowMap.value ? 0.59 : 1
    } else {
      splitSize.value = isShowMap.value ? 0.675 : 1
    }
  },
  { immediate: true }
)
function mapFunc(map: UI.MapItem) {
  currentMap.value = map
}
function actionFunc(action: UI.ActionButton) {
  showMap()
  window.$message?.info(action.text)
}
function nextText() {
  showMap()
  console.log(currentMap.value.text)
}

onMounted(() => {
  // 初始化地图
  mapItems.value.push(
    {
      id: 1,
      title: $t('map.title.title1'),
      text: 'text1',
      cover: '/static/imgs/t1.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 2,
      title: $t('map.title.title2'),
      text: 'text2',
      cover: '/static/imgs/t2.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 3,
      title: $t('map.title.title3'),
      text: 'text3',
      cover: '/static/imgs/t3.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 4,
      title: $t('map.title.title4'),
      text: 'text4',
      cover: '/static/imgs/t4.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    }
  )
  // 初始化操作按钮
  actionButtons.value.push(
    {
      id: 1,
      text: '石头剪刀布',
      icon: 'streamline:peace-hand',
      type: 'primary',
      isDisabled: false,
      isShow: true
    },
    {
      id: 2,
      text: '掷骰子',
      icon: 'streamline-emojis:game-dice',
      type: 'primary',
      isDisabled: false,
      isShow: true
    }
  )
  if (userInfo.archive.place > 0) {
    currentMap.value = mapItems.value.filter((x) => x.id == userInfo.archive.place)[0]
  }
})

// map 地图
// task 任务
// achievement 成就
// relationship 关系
// story 故事
// plot 剧情
// branch-line 主线
// main-line 支线
// unit-plot 单元剧
</script>
