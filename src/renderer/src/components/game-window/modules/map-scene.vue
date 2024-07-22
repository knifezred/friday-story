<template>
  <NFlex vertical :size="0">
    <div
      :style="
        'background-image: url(http://localhost:5175' +
        mapStore.currMap.cover +
        ');padding-top: 56.25%;'
      "
      class="bg-repeat-round"></div>
    <n-card
      class="w-full bg-gray-8"
      :class="!appStore.siderCollapse ? 'pos-relative bg-op-1' : 'pos-fixed bottom-0 bg-op-50'"
      :style="appStore.siderCollapse ? 'height:20.5vw' : 'height:18vw'"
      style="border: 0; border-radius: 0">
      <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
        <n-p class="text-xl color-success">
          <TypedText v-model:value="isTyped" :strings="$t(currentText)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <n-flex>
          <n-button
            v-for="btn in actionStore.options"
            :key="btn.id"
            :type="btn.buttonType"
            :is-disabled="btn.isDisabled"
            :is-show="btn.isShow"
            class="color-white w-40"
            @click="actionFunc(btn)">
            <SvgIcon v-if="btn.icon != undefined" :icon="btn.icon" class="mr-1" />
            {{ $t(btn.text) }}
          </n-button>
        </n-flex>
      </template>
    </n-card>
  </NFlex>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/store/modules/app'
import { useGameActionStore } from '@renderer/store/modules/game-action'
import { useMapStore } from '@renderer/store/modules/game-map'
import { ref, watch } from 'vue'

defineOptions({
  name: 'MapScene'
})
const currentText = ref('')
const isTyped = ref(false)
const appStore = useAppStore()
const mapStore = useMapStore()
const actionStore = useGameActionStore()
interface Emits {
  (e: 'result', result: boolean): boolean
}
defineEmits<Emits>()

function actionFunc(action: Dto.ActionOption) {
  switch (action.type) {
    case 'map':
      nextText(action)
      break
    case 'mini-game':
      appStore.currentMiniGame = action.miniGame ?? 'finger-guessing'
      break
    case 'story':
      appStore.currentStory = action.next ?? 'start'
      appStore.siderCollapse = true
      break
    default:
      nextText(action)
      break
  }
  appStore.currentSceneType = action.type
}

function nextText(action: Dto.ActionOption) {
  if (isTyped.value) {
    isTyped.value = false
  } else {
    isTyped.value = true
    currentText.value = actionStore.executeAction(action)
  }
}

watch(
  [() => mapStore.currMap],
  () => {
    // 默认文本
    isTyped.value = true
    currentText.value = mapStore.currMap.text
    // 加载按钮
    actionStore.loadActionOptions(mapStore.currMap, null)
    // 加载事件

    // 加载NPC
  },
  { immediate: true }
)
</script>

<style scoped></style>
