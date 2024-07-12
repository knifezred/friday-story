<template>
  <n-split
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :default-size="0.68"
    :min="0.68"
    :max="0.68">
    <template #1>
      <n-split direction="vertical" :default-size="0.675" :min="0.675" :max="0.675">
        <template #1>
          <NFlex vertical>
            <UiScene :map="currentMap" />
          </NFlex>
        </template>
        <template #2>
          <n-scrollbar class="h-30vh" :distance="10">
            <n-card>
              <n-p class="text-xl">hello world</n-p>
            </n-card>
          </n-scrollbar>
        </template>
      </n-split>
    </template>
    <template #2>
      <n-split direction="vertical" :default-size="0.675" :min="0.675" :max="0.675">
        <template #1>
          <NFlex vertical class="pa-2 text-center">
            <n-p>
              <icon-wi:day-sunny class="size-8" />
              <n-tag type="primary"> 2024-07-11 18:23</n-tag>
              <button-icon text icon="mynaui:plus-square" style="vertical-align: sub" class="mx-1">
              </button-icon>
            </n-p>
            <n-scrollbar class="h-56vh" :distance="10">
              <NFlex>
                <n-card
                  v-for="item in mapItems"
                  :key="item.id"
                  :title="item.text"
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
        <template #2>
          <n-scrollbar class="h-30vh" :distance="10">
            <n-button-group vertical class="w-full pa-1">
              <n-button
                v-for="btn in actionButtons"
                :key="btn.id"
                :type="btn.type"
                :is-disabled="btn.isDisabled"
                :is-show="btn.isShow"
                block
                @click="actionFunc(btn)">
                {{ btn.text }}
                <SvgIcon v-if="btn.icon != ''" :icon="btn.icon" class="ml-1" />
              </n-button>
            </n-button-group>
          </n-scrollbar>
        </template>
      </n-split>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import { useAuthStore } from '@renderer/store/modules/auth'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'Home'
})

const mapItems = ref<Array<UI.MapItem>>([])
const actionButtons = ref<Array<UI.ActionButton>>([])

const currentMap = ref<UI.MapItem>({
  id: 0,
  text: '',
  cover: '',
  video: '',
  icon: '',
  isDisabled: false,
  isShow: false,
  level: 0
})
const { userInfo } = useAuthStore()
function mapFunc(map: UI.MapItem) {
  currentMap.value = map
}
function actionFunc(action: UI.ActionButton) {
  window.$message?.info(action.text)
}
onMounted(() => {
  // 初始化地图
  mapItems.value.push(
    {
      id: 1,
      text: '字数测试',
      cover: '/static/imgs/t1.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 2,
      text: '这是五个字',
      cover: '/static/imgs/t2.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 3,
      text: '三个字',
      cover: '/static/imgs/t3.webp',
      video: '',
      icon: '',
      isDisabled: false,
      isShow: false,
      level: 1
    },
    {
      id: 4,
      text: '六个字怎么样',
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
      type: 'default',
      isDisabled: false,
      isShow: true
    },
    {
      id: 2,
      text: '掷骰子',
      icon: 'streamline-emojis:game-dice',
      type: 'default',
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
