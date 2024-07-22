<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full select-none">
    <AppProvider>
      <RouterView class="bg-layout"></RouterView>
    </AppProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { naiveDateLocales, naiveLocales } from './locales/naive'
import { useAppStore } from './store/modules/app'
import { useThemeStore } from './store/modules/theme'

defineOptions({
  name: 'App'
})

const appStore = useAppStore()
const themeStore = useThemeStore()
const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined))

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale]
})

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale]
})
onMounted(() => {
  // 计算时间
})
onUnmounted(() => {
  // 取消计算
})
</script>
