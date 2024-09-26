<template>
  <n-avatar :round="round" :bordered="true" :class="bgColor">
    <slot />
  </n-avatar>
</template>

<script setup lang="ts">
import { useThemeStore } from '@renderer/store/modules/theme'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'LevelAvatar'
})
interface Props {
  level?: Dto.LevelType | undefined
  round: boolean
}
const { level } = withDefaults(defineProps<Props>(), {
  round: true
})
const themeStore = useThemeStore()
const bgColor = ref('text-gray')
onMounted(() => {
  if (themeStore.themeScheme == 'dark') {
    if (level == undefined) {
      bgColor.value = 'border-gray-600'
    }
    if (level == 'SSR') {
      bgColor.value = 'border-error-600'
    }
    if (level == 'SR') {
      bgColor.value = 'border-warning-600'
    }
    if (level == 'R') {
      bgColor.value = 'border-primary-600'
    }
    if (level == 'N') {
      bgColor.value = 'border-success-600'
    }
  } else {
    if (level == undefined) {
      bgColor.value = 'border-gray'
    }
    if (level == 'SSR') {
      bgColor.value = 'border-error'
    }
    if (level == 'SR') {
      bgColor.value = 'border-warning'
    }
    if (level == 'R') {
      bgColor.value = 'border-primary'
    }
    if (level == 'N') {
      bgColor.value = 'border-success'
    }
  }
})
</script>

<style scoped></style>
