<template>
  <n-split
    v-model:size="splitSize"
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :min="splitSize"
    :max="splitSize">
    <template #1>
      <NFlex v-if="!isShowMiniGame" vertical :size="0">
        <UiScene :map="currentMap" />
        <n-card
          class="w-full bg-primary bg-op-30"
          :class="isShowMap ? 'pos-relative' : 'pos-fixed bottom-0'"
          :style="appStore.siderCollapse ? 'height:20.5vw' : 'height:18vw'"
          style="border: 0; border-radius: 0">
          <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
            <n-p class="text-xl color-white">
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
          <n-tag type="primary"> {{ formatTimestamp(worldTime, 'YYYY-MM-DD HH:mm') }} ⛅ </n-tag>
        </n-p>
        <n-statistic>
          <template #prefix>💴</template>
          <n-number-animation show-separator :from="0" :to="12039" />
        </n-statistic>
        <n-scrollbar class="h-100vh" :distance="10">
          <NFlex>
            <n-card
              v-for="item in mapItems"
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
                  v-if="item.id == currentMap.id"
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
import { DefaultMaps } from '@renderer/constants/data/map'
import { useAppStore } from '@renderer/store/modules/app'
import { useAuthStore } from '@renderer/store/modules/auth'
import { formatTimestamp } from '@renderer/utils/common'
import { onMounted, ref, watch } from 'vue'
defineOptions({
  name: 'Home'
})
const worldTime = ref(Date.now())
const allMaps = ref<Array<Dto.MapItem>>(DefaultMaps)
const mapItems = ref<Array<Dto.MapItem>>([])
const actionButtons = ref<Array<Dto.ActionButton>>([])
const isShowMap = ref(false)
const currentText = ref('')
const isShowMiniGame = ref(false)
const miniGameModule = ref<UnionKey.MiniGameModule>('finger-guessing')
const splitSize = ref(1)
const currentMap = ref<Dto.MapItem>({
  id: 0,
  pid: 0,
  staticId: 'test.home',
  title: '',
  text: '',
  cover: ''
})
const { userInfo } = useAuthStore()
const appStore = useAppStore()

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
  }
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
    reloadMapList(map.jumpId, map.pid)
  }
  if (!isShowMiniGame.value) {
    userInfo.archive.place = map.id
    currentMap.value = map
    currentText.value = map.text ? map.text : map.staticId + '.text'
  } else {
    window.$message?.info('in mini game,please wait game ended')
  }
}
function reloadMapList(jumpId: number, pid: number) {
  mapItems.value = allMaps.value.filter((x) => x.pid == jumpId)
  setTimeout(() => {
    if (mapItems.value.length > 0) {
      if (mapItems.value.filter((x) => x.id == pid).length > 0) {
        currentMap.value = mapItems.value.filter((x) => x.id == pid)[0]
      } else {
        currentMap.value = mapItems.value[0]
      }
      currentText.value = currentMap.value.text
        ? currentMap.value.text
        : currentMap.value.staticId + '.text'
    }
  }, 1)
}

onMounted(() => {
  allMaps.value.forEach((map) => {
    map.staticId = 'map.' + map.staticId
    map.title = map.title ? map.title : map.staticId + '.title'
    map.text = map.text ? map.text : map.staticId + '.text'
    map.cover = map.cover ? map.cover : '/static/' + map.staticId.replaceAll('.', '/') + '.jpeg'
  })
  // 初始化地图
  reloadMapList(0, 0)
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
      id: 2,
      text: '发呆',
      type: 'primary',
      isDisabled: false,
      isShow: true
    }
  )
  // if (userInfo.archive.place > 0) {
  //   currentMap.value = mapItems.value.filter((x) => x.id == userInfo.archive.place)[0]
  //   currentText.value = currentMap.value.text
  //     ? currentMap.value.text
  //     : currentMap.value.staticId + '.text'
  // }
})

// map 地图
// story 故事
// plot 剧情
// branch-line 主线
// main-line 支线
// unit-plot 单元剧
</script>
