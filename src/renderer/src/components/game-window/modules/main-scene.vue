<template>
  <NFlex vertical :size="0">
    <Transition :name="projectSetting.sceneTransition" mode="out-in" appear>
      <video
        v-if="isVideo"
        :key="'v' + cover"
        :src="appStore.projectSettings.localhost + cover"
        autoplay
        loop
        class="h-56.25%"></video>
      <div
        v-else
        :key="cover"
        :style="
          'background-image: url(' +
          appStore.projectSettings.localhost +
          cover +
          ');padding-top: 56.25%;'
        "
        class="bg-no-repeat bg-cover">
        <!-- <p class="pt-12 pl-24 absolute-lt text-error">
        {{ cover }}
      </p> -->
      </div>
    </Transition>
    <n-card
      class="bg-gray-8 bg-op-50"
      :class="!appStore.siderCollapse ? 'pos-relative' : 'pos-fixed bottom-0'"
      :style="
        appStore.siderCollapse
          ? 'height:20.5vw;width:calc(100% - ' + themeStore.sider.mixCollapsedWidth + 'px);'
          : 'height:18vw;background-image: url(' +
            appStore.projectSettings.localhost +
            'static/frame/dialogue_card_bg.jpg);'
      "
      style="border: 0; border-radius: 0; background-repeat: round">
      <n-scrollbar class="h-20vh" :distance="10" @click="nextText">
        <n-p class="text-xl color-success">
          <TypedText
            v-model:value="isTyped"
            :speed="appStore.projectSettings.textSpeed"
            :strings="$t(currentText, gameStore.langParams)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <Transition :name="projectSetting.optionTransition" mode="out-in" appear>
          <n-flex :key="gameStore.currentScene.name" justify="center">
            <template v-for="btn in actionStore.options" :key="btn.name">
              <n-button
                v-if="btn.isShow != false"
                :type="btn.buttonType ?? 'primary'"
                :disabled="btn.isDisabled || btn.locked"
                class="min-w-42"
                :style="btn.loading != true ? '' : computedButtonLoadingStyle"
                @click="executeOption(btn)">
                <template #icon>
                  <SvgIcon v-if="btn.icon != undefined" :icon="btn.icon" class="mr-1" />
                </template>
                {{ btn.locked == true ? '???' : $t(btn.text) }}
              </n-button>
            </template>
          </n-flex>
        </Transition>
      </template>
    </n-card>
  </NFlex>
</template>

<script setup lang="ts">
import { $t } from '@renderer/locales'
import { projectSetting } from '@renderer/settings/projectSetting'
import { useAppStore } from '@renderer/store/modules/app'
import { useGameStore } from '@renderer/store/modules/game'
import { useGameActionStore } from '@renderer/store/modules/game-action'
import { useGameItemStore } from '@renderer/store/modules/game-item'
import { useMapStore } from '@renderer/store/modules/game-map'
import { useStoryStore } from '@renderer/store/modules/game-story'
import { useThemeStore } from '@renderer/store/modules/theme'
import { dynamicResource } from '@renderer/utils/common'
import { computed, ref, watch } from 'vue'

defineOptions({
  name: 'MainScene'
})

const textIndex = ref(0)
const isVideo = ref(false)
const isTyped = ref(false)
const currentText = ref('')
const cover = ref<string>('')
const appStore = useAppStore()
const actionStore = useGameActionStore()
const gameStore = useGameStore()
const mapStore = useMapStore()
const itemStore = useGameItemStore()
const storyStore = useStoryStore()
const themeStore = useThemeStore()

const computedButtonLoadingStyle = computed(() => {
  return {
    'background-image': 'linear-gradient(to right, var(--n-color-hover), var(--n-color-hover))',
    'background-size': '100% 100%',
    'background-repeat': 'no-repeat',
    animation: 'bgColorWidthTransition ' + actionStore.currentAction.duration + 'ms forwards'
  }
})

function bindText(text: string[]) {
  isTyped.value = true
  gameStore.currentScene.text.length = text.length
  textIndex.value = 0
  if (text.length > textIndex.value) {
    currentText.value = text[textIndex.value]
  }
}

// 从文件夹下动态获取场景资源（图片/视频），视频只支持mp4格式
async function dynamicCover() {
  if (gameStore.currentScene.cover.indexOf('.') == -1) {
    console.log(cover.value)
    cover.value = await dynamicResource(gameStore.currentScene.cover)
  } else {
    cover.value = gameStore.currentScene.cover
  }
  if (cover.value.endsWith('.mp4')) {
    isVideo.value = true
  } else {
    isVideo.value = false
  }
  return cover.value
}

async function nextScene(next: string) {
  gameStore.currentScene = storyStore.getStoryScene(next)
  await dynamicCover()
  bindText(gameStore.currentScene.text)
  // 绑定按钮
  loadOptions(gameStore.currentScene.options, gameStore.currentScene.next)
}

async function nextText(isAutoNext: boolean = true) {
  if (isTyped.value) {
    // 再次点击取消打字机效果
    isTyped.value = false
  } else {
    if (textIndex.value == gameStore.currentScene.text.length - 1 && isAutoNext) {
      if (actionStore.options.length == 0) {
        if (gameStore.currentScene.next != '') {
          await nextScene(gameStore.currentScene.next)
        } else {
          await storyStore.storyFinished(storyStore.currentStory.name)
          // end
          gameStore.currentSceneType = 'map'
          appStore.setSiderCollapse(false)
        }
      }
    } else if (textIndex.value < gameStore.currentScene.text.length - 1) {
      textIndex.value += 1
      if (textIndex.value >= gameStore.currentScene.text.length) {
        bindText(gameStore.currentScene.text)
      } else {
        isTyped.value = true
        currentText.value = gameStore.currentScene.text[textIndex.value]
      }
    } else if (textIndex.value == 0 && gameStore.currentScene.text.length == 0) {
      if (actionStore.options.length == 0) {
        if (gameStore.currentScene.next != '') {
          await nextScene(gameStore.currentScene.next)
        } else {
          await storyStore.storyFinished(storyStore.currentStory.name)
          // end
          gameStore.currentSceneType = 'map'
          appStore.setSiderCollapse(false)
        }
      }
    }
  }
}

// 按钮点击事件
async function executeOption(action: Dto.ActionOption) {
  action.isDisabled = true
  action.loading = true
  await actionStore.executeAction(action)
  loadOptions(gameStore.currentScene.options, gameStore.currentScene.next)
  action.isDisabled = false
  action.loading = false
  if (actionStore.currentAction.canExecute) {
    gameStore.currentSceneType = action.type
    switch (action.type) {
      case 'map':
        mapStore.currMap.isLocked = false
        if (action.next != undefined && action.next != '') {
          mapStore.nextMap(action.next, mapStore.currMap)
        }
        break
      case 'mini-game':
        gameStore.currentMiniGame = action.miniGame ?? 'finger-guessing'
        break
      case 'shop':
        itemStore.currentShop = action.next ?? 'default'
        break
      case 'story':
        storyStore.setCurrentStory(action.next ?? 'restart')
        appStore.setSiderCollapse(true)
        if (action.next != undefined && action.next.startsWith('scene')) {
          await nextScene(action.next)
        } else {
          await nextText()
        }
        break
      case 'workbench':
        itemStore.currentShop = action.next ?? 'default'
        break
      default:
        nextText()
        break
    }
  }
}
// 加载场景
async function loadCurrentScene(
  options,
  cover: string,
  next: string | undefined,
  text: string[],
  name: string
) {
  gameStore.currentScene = {
    name: name,
    title: '',
    text: text,
    cover: cover,
    next: next ?? '',
    options: options ?? undefined
  }
  await dynamicCover()
  loadOptions(gameStore.currentScene.options, next)
  bindText(gameStore.currentScene.text)
}

function loadOptions(options: Array<Dto.ActionOption>, next: string | undefined) {
  const infos = actionStore.loadActionOptions(options, next)
  for (const info of infos) {
    gameStore.currentScene.text.push(info)
  }
}

watch([() => gameStore.currentScene.text.length], () => {
  nextText(false)
})

watch([() => isTyped.value], () => {
  // 自动跳转下一段话
  if (isTyped.value == false) {
    setTimeout(() => {
      nextText(false)
    }, 500)
  }
})

watch(
  [() => storyStore.currentStory],
  async () => {
    if (gameStore.currentSceneType == 'story' && storyStore.currentStory != undefined) {
      await loadCurrentScene(
        storyStore.currentStory.options,
        storyStore.currentStory.cover,
        storyStore.currentStory.nextScene,
        storyStore.currentStory.text,
        storyStore.currentStory.name
      )
    }
  },
  { immediate: true }
)

watch(
  [() => mapStore.currMap],
  async () => {
    if (gameStore.currentSceneType == 'map') {
      await loadCurrentScene(
        mapStore.currMap.options,
        mapStore.currMap.cover,
        mapStore.currMap.next,
        [mapStore.currMap.text],
        mapStore.currMap.name
      )
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="css"></style>
