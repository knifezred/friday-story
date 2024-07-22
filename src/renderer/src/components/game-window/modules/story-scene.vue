<template>
  <NFlex vertical :size="0">
    <video
      v-if="isVideo"
      :src="'http://localhost:5175' + cover"
      autoplay
      loop
      class="h-56.25%"></video>
    <div
      v-else
      :style="'background-image: url(http://localhost:5175' + cover + ');padding-top: 56.25%;'"
      class="bg-repeat-round">
      <p class="pt-12 pl-24 absolute-lt text-error">
        {{ cover }}
      </p>
    </div>
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
import { useGameActionStore } from '@renderer/store/modules/game-action'
import { useStoryStore } from '@renderer/store/modules/game-story'
import { dynamicResource } from '@renderer/utils/common'
import { ref, watch } from 'vue'

defineOptions({
  name: 'StoryScene'
})

const isArrayText = ref(false)
const textIndex = ref(0)
const totalTextCount = ref(1)
const isFileExists = ref(false)
const isVideo = ref(false)
const isTyped = ref(false)
const currentText = ref('')
const cover = ref<string>('')
const currentScene = ref<Dto.GameScene>({
  name: 'test',
  title: '',
  cover: '/static/stories/start',
  next: '',
  options: [],
  text: ''
})
const appStore = useAppStore()
const actionStore = useGameActionStore()
const storyStore = useStoryStore()

function bindText(text: string | string[]) {
  isTyped.value = true
  if (typeof text == 'string') {
    isArrayText.value = false
    totalTextCount.value = 1
    textIndex.value = 0
    currentText.value = text
  } else {
    isArrayText.value = true
    totalTextCount.value = text.length
    currentText.value = text[textIndex.value]
  }
}

async function dynamicCover() {
  if (currentScene.value.cover.indexOf('.') == -1) {
    console.log(cover.value)
    cover.value = await dynamicResource(currentScene.value.cover)
  }
  if (cover.value.endsWith('.mp4')) {
    isVideo.value = true
  } else {
    isVideo.value = false
  }
  return cover.value
}

async function nextScene(next: string) {
  currentScene.value = storyStore.getStoryScene(next)
  await dynamicCover()
  bindText(currentScene.value.text)
  // 绑定按钮
  actionStore.loadActionOptions(null, currentScene.value)
  isFileExists.value = window.api.isFileExist(currentScene.value.cover)
}

async function nextText() {
  if (isTyped.value) {
    // 再次点击取消打字机效果
    isTyped.value = false
  } else {
    if (isArrayText.value) {
      textIndex.value += 1
    }
    if (textIndex.value == totalTextCount.value || !isArrayText.value) {
      if (actionStore.options.length == 0) {
        if (currentScene.value.next != '') {
          await nextScene(currentScene.value.next)
        } else {
          // end
          appStore.currentSceneType = 'map'
          appStore.siderCollapse = false
          window.$message?.info($t('stories.over'))
        }
      }
    }
    bindText(currentScene.value.text)
  }
}

async function actionFunc(action: Dto.ActionOption) {
  if (action.type == 'story') {
    if (action.next != undefined && action.next.startsWith('scene')) {
      await nextScene(action.next)
    }
  } else {
    await nextText()
  }
}

watch(
  [() => appStore.currentStory],
  async () => {
    storyStore.setCurrentStory(appStore.currentStory)
    currentScene.value.cover = storyStore.currentStory.cover
    await dynamicCover()
    currentScene.value.next = storyStore.currentStory.nextScene
    currentScene.value.text = storyStore.currentStory.text
    actionStore.loadActionOptions(null, currentScene.value)
    bindText(currentScene.value.text)
  },
  { immediate: true }
)
</script>

<style scoped></style>
