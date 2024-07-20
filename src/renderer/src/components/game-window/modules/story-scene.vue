<template>
  <NFlex vertical :size="0">
    <div
      :style="
        'background-image: url(http://localhost:5175' +
        currentScene.cover +
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
            v-for="btn in actionOptions"
            :key="btn.id"
            :type="btn.type"
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
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useStoryStore } from '@renderer/store/modules/story'
import { ref, watch } from 'vue'

defineOptions({
  name: 'UiScene'
})
const actionOptions = ref<Array<Dto.ActionOption>>([])
const currentText = ref('')
const currentScene = ref<Dto.GameScene>({
  name: 'test',
  title: '',
  cover: '',
  next: '',
  options: [],
  text: ''
})
const appStore = useAppStore()
const storyStore = useStoryStore()

function nextScene(next: string) {
  currentScene.value = storyStore.getStoryScene(next)
  // 绑定按钮
  actionOptions.value = storyStore.getOptions(currentScene.value.options)
}

function actionFunc(action: Dto.ActionOption) {
  if (action.actionType == 'story') {
    if (action.next != undefined && action.next.startsWith('scene')) {
      nextScene(action.next)
      currentText.value = currentScene.value.text
    }
  } else {
    nextText()
  }
}

function nextText() {
  // plot text array
  if (actionOptions.value.length == 0) {
    if (currentScene.value.next != '') {
      nextScene(currentScene.value.next)
    } else {
      // end
      appStore.currentSceneType = 'map'
      window.$message?.info($t('stories.over'))
    }
  }
  currentText.value = currentScene.value.text
}

watch(
  [() => appStore.currentStory],
  () => {
    storyStore.setCurrentStory(appStore.currentStory)
    // 默认加载story，此处没有options
    currentScene.value.cover = storyStore.currentStory.cover
    currentScene.value.next = storyStore.currentStory.nextScene
    currentText.value = storyStore.currentStory.text
  },
  { immediate: true }
)
</script>

<style scoped></style>
