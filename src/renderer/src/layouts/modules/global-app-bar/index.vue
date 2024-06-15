<script setup lang="ts">
import { useThemeStore } from '@renderer/store/modules/theme'
import { useFullscreen } from '@vueuse/core'
import GlobalLogo from '../global-logo/index.vue'

defineOptions({
  name: 'GlobalAppBar'
})

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps['showLogo']
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps['showMenuToggler']
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps['showMenu']
}

defineProps<Props>()

const themeStore = useThemeStore()
const { toggle } = useFullscreen()
</script>

<template>
  <DarkModeContainer
    class="h-full flex-y-center px-12px shadow-header"
    style="-webkit-app-region: drag">
    <GlobalLogo v-if="showLogo" class="h-full" :style="{ width: themeStore.sider.width + 'px' }" />
    <div v-else class="h-full flex-y-center flex-1-hidden"></div>
    <div class="h-full flex-y-center justify-end" style="-webkit-app-region: no-drag">
      <WindowMinimize />
      <WindowMaximize @click="toggle" />
      <WindowClose />
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
