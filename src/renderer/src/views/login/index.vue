<script setup lang="ts">
import { loginModuleRecord } from '@renderer/constants/app'
import { $t } from '@renderer/locales'
import { mixColor } from '@renderer/packages/color'
import { useAppStore } from '@renderer/store/modules/app'
import { useThemeStore } from '@renderer/store/modules/theme'
import { staticPath } from '@renderer/utils/common'
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import GameStart from './modules/game-start.vue'
import PwdLogin from './modules/pwd-login.vue'
import Register from './modules/register.vue'
import ResetPwd from './modules/reset-pwd.vue'
interface Props {
  /** The login module */
  module?: UnionKey.LoginModule
}

const props = defineProps<Props>()

const appStore = useAppStore()
const themeStore = useThemeStore()

interface LoginModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.LoginModule, LoginModule> = {
  'pwd-login': { label: loginModuleRecord['pwd-login'], component: PwdLogin },
  register: { label: loginModuleRecord.register, component: Register },
  'reset-pwd': { label: loginModuleRecord['reset-pwd'], component: ResetPwd },
  'game-start': { label: loginModuleRecord['game-start'], component: GameStart }
}

const activeModule = ref<LoginModule>(moduleMap['game-start'])
computed(() => moduleMap[props.module || 'game-start'])
function changeComponent(module: string) {
  activeModule.value = moduleMap[module || 'game-start']
}

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff'

  const ratio = themeStore.darkMode ? 0.5 : 0.2

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio)
})
</script>

<template>
  <kinesis-container>
    <div
      class="relative size-full flex-center overflow-hidden"
      :style="{ backgroundColor: bgColor }">
      <NCard :bordered="false" class="absolute-center z-4 w-auto rd-0 opacity-50">
        <div class="w-400px lt-sm:w-300px">
          <header class="flex-y-center justify-between">
            <kinesis-element :strength="10" type="depth">
              <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
            </kinesis-element>
            <kinesis-element :strength="10">
              <h3 class="text-28px text-primary font-500 lt-sm:text-22px">
                {{ $t('system.title') }}
              </h3>
            </kinesis-element>

            <div class="i-flex-col">
              <ThemeSchemaSwitch
                :theme-schema="themeStore.themeScheme"
                :show-tooltip="false"
                class="text-20px lt-sm:text-18px"
                @switch="themeStore.toggleThemeScheme" />
              <LangSwitch
                :lang="appStore.locale"
                :lang-options="appStore.localeOptions"
                :show-tooltip="false"
                @change-lang="appStore.changeLocale" />
            </div>
          </header>
          <main class="pt-2xl">
            <h3 class="text-18px text-primary font-medium">{{ $t(activeModule.label) }}</h3>
            <div class="pt-24px">
              <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
                <component :is="activeModule.component" @module="changeComponent" />
              </Transition>
            </div>
          </main>
        </div>
      </NCard>
      <video
        :src="staticPath('/static/frame/login_bg.mp4')"
        class="absolute"
        autoplay
        muted
        loop
        style="
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
        "></video>
    </div>
  </kinesis-container>
</template>
