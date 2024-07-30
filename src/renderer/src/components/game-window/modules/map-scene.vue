<template>
  <NFlex vertical :size="0">
    <div
      :style="
        'background-image: url(' +
        appStore.projectSettings.localhost +
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
        <n-p class="text-xl text-info">
          <TypedText
            v-model:value="isTyped"
            :speed="appStore.projectSettings.textSpeed"
            :strings="$t(currentText)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <n-flex justify="right">
          <n-button
            v-for="btn in actionStore.options"
            :key="btn.name"
            :type="btn.buttonType ?? 'primary'"
            :is-disabled="btn.isDisabled"
            :is-show="btn.isShow"
            strong
            secondary
            class="min-w-42"
            @click="actionFunc(btn)">
            <template #icon>
              <SvgIcon v-if="btn.icon != undefined" :icon="btn.icon" class="mr-1" />
            </template>
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
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { useMapStore } from '@renderer/store/modules/game-map'
import { useStoryStore } from '@renderer/store/modules/game-story'
import { ref, watch } from 'vue'

defineOptions({
  name: 'MapScene'
})
const currentText = ref('')
const isTyped = ref(false)
const appStore = useAppStore()
const mapStore = useMapStore()
const actionStore = useGameActionStore()
const itemStore = useGameItemStore()
const storyStore = useStoryStore()
interface Emits {
  (e: 'result', result: boolean): boolean
}
defineEmits<Emits>()

function actionFunc(action: Dto.ActionOption) {
  const checkInfo = actionStore.executeAction(action)
  if (actionStore.currentAction.canExecute) {
    switch (action.type) {
      case 'map':
        nextText()
        mapStore.currMap.isLocked = false
        mapStore.nextMap(action.next, mapStore.currMap)
        break
      case 'mini-game':
        appStore.currentMiniGame = action.miniGame ?? 'finger-guessing'
        break
      case 'story':
        storyStore.setCurrentStory(action.next ?? 'start')
        appStore.siderCollapse = true
        break
      case 'shop':
        itemStore.currentShop = action.next ?? 'happy_shop'
        break
      default:
        nextText()
        break
    }
    appStore.currentSceneType = action.type
  } else {
    isTyped.value = true
    currentText.value = checkInfo
  }
}

function nextText() {
  if (isTyped.value) {
    isTyped.value = false
  }
}

watch(
  [() => mapStore.currMap],
  () => {
    // 默认文本
    isTyped.value = true
    currentText.value = mapStore.currMap.text
    // 加载按钮
    actionStore.loadActionOptions(mapStore.currMap.options, mapStore.currMap.next)
    // 加载事件

    // 加载NPC
  },
  { immediate: true }
)
</script>

<style scoped></style>
