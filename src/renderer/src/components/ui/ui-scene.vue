<template>
  <NFlex vertical :size="0">
    <div
      v-if="!isShowMiniGame"
      :style="'background-image: url(http://localhost:5175' + map.cover + ');padding-top: 56.25%;'"
      class="bg-repeat-round"></div>
    <MiniGame v-else :module="miniGameModule" @game-result="gameResult" />
    <n-card
      class="w-full bg-primary bg-op-30"
      :class="!appStore.siderCollapse ? 'pos-relative' : 'pos-fixed bottom-0'"
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
</template>

<script setup lang="ts">
import { DefaultActions } from '@renderer/constants/data/action'
import { useAppStore } from '@renderer/store/modules/app'
import { ref, watch } from 'vue'

defineOptions({
  name: 'UiScene'
})
const actionButtons = ref<Array<Dto.ActionButton>>([])
const currentText = ref('')
const isShowMiniGame = ref(false)
const miniGameModule = ref<UnionKey.MiniGameModule>('finger-guessing')
const appStore = useAppStore()
const { addMoney, coastTime } = useAppStore()
interface Props {
  map: Dto.MapItem
  value: boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:value', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function actionFunc(action: Dto.ActionButton) {
  if (action.miniGame != undefined) {
    isShowMiniGame.value = true
    miniGameModule.value = action.miniGame
    emit('update:value', isShowMiniGame.value)
  } else {
    nextText()
    coastTime(60)
    addMoney(1000)
  }
}

function gameResult(result: string) {
  isShowMiniGame.value = false
  currentText.value = 'game result:' + result
}

function nextText() {
  currentText.value = 'next text todo'
}

watch(
  [() => props.map],
  () => {
    // 默认文本
    currentText.value = props.map.text
    // 加载按钮
    actionButtons.value = DefaultActions.filter((x) => props.map.actions.includes(x.id))
  },
  { immediate: true }
)
</script>

<style scoped></style>
