<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full">
    <AppProvider>
      <RouterView class="bg-layout"></RouterView>
    </AppProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { computed, onUnmounted } from 'vue'
import { naiveDateLocales, naiveLocales } from './locales/naive'
import { useAppStore } from './store/modules/app'
import { clearAuthStorage } from './store/modules/auth/shared'
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

onUnmounted(() => {
  clearAuthStorage()
})
</script>
