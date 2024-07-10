<template>
  <n-split
    direction="horizontal"
    style="height: 100%; width: 100%; padding: 0"
    :default-size="0.8"
    :min="0.7"
    :max="0.8">
    <template #1>
      <n-split direction="vertical" :default-size="0.675" :min="0.675" :max="0.675">
        <template #1>
          <NSpace vertical>
            <NCard :bordered="false" class="relative w-auto rd-12px">
              <FingerGuessing :total-rounds="3" @game-result="gameResult"></FingerGuessing>
            </NCard>
          </NSpace>
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
          <NSpace vertical class="pa-2 text-center">
            <n-h3>test</n-h3>
          </NSpace>
        </template>
        <template #2>
          <n-button-group vertical class="w-full pa-1">
            <n-button block type="info" @click="actionFunc"> 随机 </n-button>
            <n-button block type="error" @click="actionFunc"> 警告 </n-button>
            <n-button block type="info" disabled @click="actionFunc"> 不少 </n-button>
          </n-button-group>
        </template>
      </n-split>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import FingerGuessing from '@renderer/components/mini-games/finger-guessing/index.vue'
defineOptions({
  name: 'Home'
})

function gameResult(result: boolean) {
  console.log(result)
}

function actionFunc() {
  window.$message?.info('test')
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

<style scoped></style>
