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
      class="opacity-80"
      :class="!appStore.siderCollapse ? 'pos-relative' : 'pos-fixed bottom-0'"
      :style="
        appStore.siderCollapse
          ? 'height:20.5vw;width:calc(100% - ' + themeStore.sider.mixCollapsedWidth + 'px);'
          : 'height:18vw;background-image: url(' +
            appStore.projectSettings.localhost +
            'static/frame/textbox.png);'
      "
      style="border: 0; border-radius: 0; background-repeat: round">
      <n-scrollbar class="h-20vh" :distance="10" @click="nextText(true)">
        <n-p class="text-xl color-success">
          <TypedText
            v-model:value="isTyped"
            :speed="appStore.projectSettings.textSpeed"
            :strings="$t(currentText, gameStore.langParams)" />
        </n-p>
      </n-scrollbar>
      <template #footer>
        <Transition :name="projectSetting.optionTransition" mode="out-in" appear>
          <n-flex :key="gameStore.renpyScene.name" justify="center">
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
  name: 'StoryScene'
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

function bindText(text: string[], index: number = 0) {
  isTyped.value = true
  gameStore.renpyScene.text.length = text.length
  textIndex.value = index
  if (text.length > textIndex.value) {
    parseText(text[textIndex.value])
  }
}

function parseText(text: string) {
  if (text.startsWith('cover=')) {
    gameStore.renpyScene.cover = text.replace('cover=', '')
    dynamicCover()
    nextText()
  } else if (text.startsWith('menu=')) {
    loadOptions(
      storyStore.getSceneOptions(gameStore.renpyScene.name, text.replace('menu=', '')),
      gameStore.renpyScene.next
    )
  } else {
    isTyped.value = true
    currentText.value = text
  }
}

// 从文件夹下动态获取场景资源（图片/视频），视频只支持mp4格式
async function dynamicCover() {
  if (gameStore.renpyScene.cover.indexOf('.') == -1) {
    console.log(cover.value)
    cover.value = await dynamicResource(gameStore.renpyScene.cover)
  } else {
    cover.value = gameStore.renpyScene.cover
  }
  if (cover.value.endsWith('.mp4')) {
    isVideo.value = true
  } else {
    isVideo.value = false
  }
  return cover.value
}

async function nextScene(next: string) {
  gameStore.renpyScene = storyStore.getStoryScene(next)
  actionStore.cleanOptions()
  await dynamicCover()
  bindText(gameStore.renpyScene.text)
}

async function nextText(isAutoNext: boolean = true) {
  if (isTyped.value) {
    // 再次点击取消打字机效果
    isTyped.value = false
  } else {
    if (actionStore.options.length == 0) {
      if (textIndex.value == gameStore.renpyScene.text.length - 1 && isAutoNext) {
        if (actionStore.options.length == 0) {
          if (gameStore.renpyScene.next != '') {
            await nextScene(gameStore.renpyScene.next)
          } else {
            await storyStore.storyFinished(storyStore.currentStory.name)
            // end
            gameStore.currentSceneType = 'map'
            appStore.setSiderCollapse(false)
          }
        }
      } else if (textIndex.value < gameStore.renpyScene.text.length - 1) {
        textIndex.value += 1
        if (textIndex.value >= gameStore.renpyScene.text.length) {
          bindText(gameStore.renpyScene.text)
        } else {
          parseText(gameStore.renpyScene.text[textIndex.value])
        }
      } else if (textIndex.value == 0 && gameStore.renpyScene.text.length == 0) {
        if (actionStore.options.length == 0) {
          if (gameStore.renpyScene.next != '') {
            await nextScene(gameStore.renpyScene.next)
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
}

// 按钮点击事件
async function executeOption(action: Dto.ActionOption) {
  action.isDisabled = true
  action.loading = true
  await actionStore.executeAction(action)
  action.isDisabled = false
  action.loading = false
  if (actionStore.currentAction.canExecute) {
    gameStore.currentSceneType = action.type
    switch (action.type) {
      case 'story':
        // await storyStore.setCurrentStory(action.next ?? 'restart')
        appStore.setSiderCollapse(true)
        if (action.next != undefined) {
          await nextScene(action.next)
        } else {
          actionStore.cleanOptions()
          await nextText()
        }
        break
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
      case 'workbench':
        itemStore.currentShop = action.next ?? 'default'
        break
      default:
        nextText()
        break
    }
    gameStore.renpyScene.text.splice(textIndex.value, 0, ...actionStore.currentAction.line)
    bindText(gameStore.renpyScene.text, textIndex.value)
  }
}

function loadOptions(options: Array<Dto.ActionOption>, next: string | undefined) {
  const infos = actionStore.loadActionOptions(options, next)
  gameStore.renpyScene.text.splice(textIndex.value, 0, ...infos)
  bindText(gameStore.renpyScene.text, textIndex.value)
}

watch([() => isTyped.value], () => {
  // 自动跳转下一段话
  if (isTyped.value == false) {
    setTimeout(() => {
      // nextText(false)
    }, 500)
  }
})

watch(
  [() => storyStore.currentStory],
  async () => {
    if (gameStore.currentSceneType == 'story' && storyStore.currentStory != undefined) {
      gameStore.renpyScene = {
        name: storyStore.currentStory.name,
        text: storyStore.currentStory.text,
        cover: storyStore.currentStory.cover,
        next: 'start',
        menus: []
      }
      await dynamicCover()
      bindText(storyStore.currentStory.text)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="css"></style>
