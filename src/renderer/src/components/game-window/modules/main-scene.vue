<template>
  <NFlex vertical :size="0">
    <video
      v-if="isVideo"
      :src="appStore.projectSettings.localhost + cover"
      autoplay
      loop
      class="h-56.25%"></video>
    <div
      v-else
      :style="
        'background-image: url(' +
        appStore.projectSettings.localhost +
        cover +
        ');padding-top: 56.25%;'
      "
      class="bg-repeat-round">
      <!-- <p class="pt-12 pl-24 absolute-lt text-error">
        {{ cover }}
      </p> -->
    </div>
    <n-card
      class="bg-gray-8"
      :class="!appStore.siderCollapse ? 'pos-relative bg-op-1' : 'pos-fixed bottom-0 bg-op-50'"
      :style="
        appStore.siderCollapse
          ? 'height:20.5vw;width:calc(100% - ' + themeStore.sider.mixCollapsedWidth + 'px);'
          : 'height:18vw;'
      "
      style="border: 0; border-radius: 0">
      <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
        <n-p class="text-xl color-success">
          <TypedText
            v-model:value="isTyped"
            :speed="appStore.projectSettings.textSpeed"
            :strings="$t(currentText, appStore.langParams)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <n-flex justify="end">
          <template v-for="btn in actionStore.options" :key="btn.name">
            <n-button
              v-if="btn.isShow != false"
              :type="btn.buttonType ?? 'primary'"
              :disabled="btn.isDisabled || btn.locked"
              class="min-w-42"
              :class="{ buttonLoading: btn.loading }"
              @click="executeOption(btn)">
              <template #icon>
                <SvgIcon v-if="btn.icon != undefined" :icon="btn.icon" class="mr-1" />
              </template>
              {{ btn.locked == true ? '???' : $t(btn.text) }}
            </n-button>
          </template>
        </n-flex>
      </template>
    </n-card>
  </NFlex>
</template>

<script setup lang="ts">
import { $t } from '@renderer/locales'
import { useAppStore } from '@renderer/store/modules/app'
import { useGameActionStore } from '@renderer/store/modules/game-action'
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { useMapStore } from '@renderer/store/modules/game-map'
import { useStoryStore } from '@renderer/store/modules/game-story'
import { useThemeStore } from '@renderer/store/modules/theme'
import { dynamicResource } from '@renderer/utils/common'
import { ref, watch } from 'vue'

defineOptions({
  name: 'StoryScene'
})

const textIndex = ref(0)
const totalTextCount = ref(1)
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
  text: []
})
const appStore = useAppStore()
const actionStore = useGameActionStore()
const mapStore = useMapStore()
const itemStore = useGameItemStore()
const storyStore = useStoryStore()
const themeStore = useThemeStore()

function bindText(text: string[]) {
  isTyped.value = true
  totalTextCount.value = text.length
  textIndex.value = 0
  if (text.length > textIndex.value) {
    currentText.value = text[textIndex.value]
  }
}

async function dynamicCover() {
  if (currentScene.value.cover.indexOf('.') == -1) {
    console.log(cover.value)
    cover.value = await dynamicResource(currentScene.value.cover)
  } else {
    cover.value = currentScene.value.cover
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
  loadOptions(currentScene.value.options, currentScene.value.next)
}

async function nextText() {
  if (isTyped.value) {
    // 再次点击取消打字机效果
    isTyped.value = false
  } else {
    if (textIndex.value == totalTextCount.value - 1) {
      if (actionStore.options.length == 0) {
        if (currentScene.value.next != '') {
          await nextScene(currentScene.value.next)
        } else {
          // end
          appStore.currentSceneType = 'map'
          appStore.siderCollapse = false
        }
      }
    } else if (textIndex.value < totalTextCount.value - 1) {
      textIndex.value += 1
      if (textIndex.value >= currentScene.value.text.length) {
        bindText(currentScene.value.text)
      } else {
        isTyped.value = true
        currentText.value = currentScene.value.text[textIndex.value]
      }
    }
  }
}

// 按钮点击事件
async function executeOption(action: Dto.ActionOption) {
  action.isDisabled = true
  action.loading = true
  const executeResult = actionStore.executeAction(action)
  for (const re of executeResult) {
    currentScene.value.text.push(re)
  }
  loadOptions(currentScene.value.options, currentScene.value.next)
  if (actionStore.currentAction.canExecute) {
    // action计数
    appStore.countOptionExecute(action.name)
    switch (action.type) {
      case 'map':
        mapStore.currMap.isLocked = false
        if (action.next != undefined && action.next != '') {
          mapStore.nextMap(action.next, mapStore.currMap)
        }
        break
      case 'mini-game':
        appStore.currentMiniGame = action.miniGame ?? 'finger-guessing'
        break
      case 'shop':
        itemStore.currentShop = action.next ?? 'happy_shop'
        break
      case 'story':
        storyStore.setCurrentStory(action.next ?? 'start')
        appStore.siderCollapse = true
        if (action.next != undefined && action.next.startsWith('scene')) {
          await nextScene(action.next)
        } else {
          await nextText()
        }
        break
      default:
        nextText()
        break
    }
    appStore.currentSceneType = action.type
  }
  nextText()
  setTimeout(() => {
    action.isDisabled = false
    action.loading = false
  }, 3000)
}
// 加载场景
async function loadCurrentScene(options, cover: string, next: string | undefined, text: string[]) {
  currentScene.value = {
    name: 'current',
    title: '',
    text: text,
    cover: cover,
    next: next ?? '',
    options: options ?? undefined
  }
  await dynamicCover()
  loadOptions(currentScene.value.options, next)
  bindText(currentScene.value.text)
}

function loadOptions(options: Array<Dto.ActionOption>, next: string | undefined) {
  const infos = actionStore.loadActionOptions(options, next)
  for (const info of infos) {
    currentScene.value.text.push(info)
  }
  totalTextCount.value = currentScene.value.text.length
  // nextText()
}

watch([() => isTyped.value], () => {
  // 自动跳转下一段话
  if (isTyped.value == false) {
    setTimeout(() => {
      nextText()
    }, 500)
  }
})

watch(
  [() => storyStore.currentStory],
  async () => {
    if (appStore.currentSceneType == 'story') {
      await loadCurrentScene(
        storyStore.currentStory.options,
        storyStore.currentStory.cover,
        storyStore.currentStory.nextScene,
        storyStore.currentStory.text
      )
    }
  },
  { immediate: true }
)

watch(
  [() => mapStore.currMap],
  async () => {
    if (appStore.currentSceneType == 'map') {
      await loadCurrentScene(
        mapStore.currMap.options,
        mapStore.currMap.cover,
        mapStore.currMap.next,
        [mapStore.currMap.text]
      )
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="css"></style>
