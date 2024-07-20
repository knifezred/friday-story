<template>
  <NFlex vertical :size="0">
    <div
      :style="
        'background-image: url(http://localhost:5175' +
        placeStore.currMap.cover +
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
          <TypedText :strings="$t(currentText)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <n-flex>
          <n-button
            v-for="btn in options"
            :key="btn.id"
            :type="btn.type"
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
import { DefaultActions } from '@renderer/constants/data/action'
import { useActionCondition } from '@renderer/hooks/business/action-condition'
import { useAppStore } from '@renderer/store/modules/app'
import { usePlaceStore } from '@renderer/store/modules/place'
import { ref, watch } from 'vue'

defineOptions({
  name: 'MapScene'
})
const options = ref<Array<Dto.ActionOption>>([])
const currentText = ref('')
const appStore = useAppStore()
const placeStore = usePlaceStore()
const actionCondition = useActionCondition()
interface Emits {
  (e: 'result', result: boolean): boolean
}
defineEmits<Emits>()

function actionFunc(action: Dto.ActionOption) {
  switch (action.actionType) {
    case 'map':
      nextText(action)
      break
    case 'mini-game':
      appStore.currentMiniGame = action.miniGame ?? 'finger-guessing'
      appStore.currentSceneType = action.actionType
      break
    case 'story':
      appStore.currentStory = action.next ?? 'start'
      appStore.currentSceneType = action.actionType
      break
    default:
      nextText(action)
      appStore.currentSceneType = action.actionType
      break
  }
}

function nextText(action: Dto.ActionOption) {
  if (placeStore.currMap.name == 'map.building.house_lin' && action.name == 'knocked') {
    currentText.value = '你敲了敲门，但没有人回应'
  }
  // plot text array
}

watch(
  [() => placeStore.currMap],
  () => {
    // 默认文本
    currentText.value = placeStore.currMap.text
    // 加载按钮
    options.value = DefaultActions.filter((x) => placeStore.currMap.options.includes(x.name))
    if (placeStore.currMap.isLocked == true) {
      currentText.value = 'map.locked.' + placeStore.currMap.lockedReason
      options.value.push(DefaultActions.filter((x) => x.id == 5)[0])
    }
    // 加载事件

    // 加载NPC
  },
  { immediate: true }
)
</script>

<style scoped></style>
