<template>
  <NFlex vertical :size="0">
    <div
      :style="
        'background-image: url(http://localhost:5175' + currentCover + ');padding-top: 56.25%;'
      "
      class="bg-repeat-round">
      <p class="pt-12 pl-24 absolute-lt text-error">
        {{ currentCover }}
      </p>
    </div>
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
import { dynamicResource } from '@renderer/utils/common'
import { ref, watch } from 'vue'

defineOptions({
  name: 'UiScene'
})
const actionOptions = ref<Array<Dto.ActionOption>>([])
const isArrayText = ref(false)
const textIndex = ref(0)
const totalTextCount = ref(1)
const isFileExists = ref(false)
const currentText = ref('')
const currentCover = ref('')
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

function bindText(scene: Dto.GameScene) {
  if (typeof scene.text == 'string') {
    isArrayText.value = false
    totalTextCount.value = 1
    textIndex.value = 0
    currentText.value = scene.text
  } else {
    isArrayText.value = true
    totalTextCount.value = scene.text.length
    currentText.value = scene.text[textIndex.value]
  }
}

async function dynamicCover() {
  currentCover.value = currentScene.value.cover
  if (currentScene.value.cover.indexOf('.') == -1) {
    currentCover.value = await dynamicResource(currentScene.value.cover)
  }
  return currentCover.value
}

function nextScene(next: string) {
  currentScene.value = storyStore.getStoryScene(next)
  dynamicCover()
  bindText(currentScene.value)
  // 绑定按钮
  actionOptions.value = storyStore.getOptions(currentScene.value.options)
  isFileExists.value = window.api.isFileExist(currentScene.value.cover)
}

function nextText() {
  if (isArrayText.value) {
    textIndex.value += 1
  }
  if (textIndex.value == totalTextCount.value || !isArrayText.value) {
    if (actionOptions.value.length == 0) {
      if (currentScene.value.next != '') {
        nextScene(currentScene.value.next)
      } else {
        // end
        appStore.currentSceneType = 'map'
        window.$message?.info($t('stories.over'))
      }
    }
  }
  bindText(currentScene.value)
}

function actionFunc(action: Dto.ActionOption) {
  if (action.actionType == 'story') {
    if (action.next != undefined && action.next.startsWith('scene')) {
      nextScene(action.next)
    }
  } else {
    nextText()
  }
}

watch(
  [() => appStore.currentStory],
  async () => {
    storyStore.setCurrentStory(appStore.currentStory)
    // 默认加载story，此处没有options
    currentScene.value.cover = storyStore.currentStory.cover
    await dynamicCover()
    currentScene.value.next = storyStore.currentStory.nextScene
    currentScene.value.text = storyStore.currentStory.text
    bindText(currentScene.value)
  },
  { immediate: true }
)
</script>

<style scoped></style>
