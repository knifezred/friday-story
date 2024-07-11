<template>
  <n-split
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :default-size="0.685"
    :min="0.65"
    :max="0.75">
    <template #1>
      <n-split direction="vertical" :default-size="0.675" :min="0.675" :max="0.675">
        <template #1>
          <NFlex vertical>
            <NCard :bordered="false" class="relative w-auto rd-12px">
              <FingerGuessing :total-rounds="3" @game-result="gameResult"></FingerGuessing>
            </NCard>
          </NFlex>
        </template>
        <template #2>
          <NCard>
            <n-scrollbar class="h-sm" :distance="10">
              <n-p class="text-2xl">hello world</n-p>
            </n-scrollbar>
          </NCard>
        </template>
      </n-split>
    </template>
    <template #2>
      <n-split direction="vertical" :default-size="0.675" :min="0.5" :max="0.8">
        <template #1>
          <NFlex vertical class="pa-2 text-center">
            <n-p>
              <n-tag type="primary">2024-07-11 18:23 </n-tag>
              <button-icon
                text
                icon="mynaui:plus-square"
                style="vertical-align: sub"
                class="mx-1"></button-icon>
            </n-p>
            <NFlex>
              <n-card
                v-for="item in mapItems"
                :key="item.id"
                :title="item.text"
                class="w-6.5vw text-center cursor-pointer map-card"
                size="small"
                hoverable
                @click="mapFunc(item)">
                <template #cover>
                  <image-icon :src="item.cover" />
                </template>
              </n-card>
            </NFlex>
          </NFlex>
        </template>
        <template #2>
          <n-button-group vertical class="w-full pa-1">
            <n-button
              v-for="btn in actionButtons"
              :key="btn.id"
              :type="btn.type"
              :icon="btn.icon"
              :is-disabled="btn.isDisabled"
              :is-show="btn.isShow"
              block
              @click="actionFunc(btn)">
              {{ btn.text }}
            </n-button>
          </n-button-group>
        </template>
      </n-split>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import FingerGuessing from '@renderer/components/mini-games/finger-guessing/index.vue'
import { ref } from 'vue'
defineOptions({
  name: 'Home'
})

const mapItems = ref<Array<UI.MapItem>>([])
const actionButtons = ref<Array<UI.ActionButton>>([])
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
actionButtons.value.push(
  {
    id: 1,
    text: '测试1',
    icon: '',
    type: 'default',
    isDisabled: false,
    isShow: true
  },
  {
    id: 2,
    text: '测试2',
    icon: '',
    type: 'default',
    isDisabled: false,
    isShow: true
  }
)

function mapFunc(map: UI.MapItem) {
  window.$message?.info(map.text)
}
function actionFunc(action: UI.ActionButton) {
  window.$message?.info(action.text)
}

function gameResult(result: boolean) {
  console.log(result)
}

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
