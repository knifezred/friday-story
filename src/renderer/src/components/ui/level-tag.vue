<template>
  <n-avatar :round="round" :bordered="false" :class="bgColor">
    {{ level == undefined ? '???' : level }}
  </n-avatar>
</template>

<script setup lang="ts">
import { useThemeStore } from '@renderer/store/modules/theme'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'LevelTag'
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
      bgColor.value = 'text-gray bg-gray-700'
    }
    if (level == 'SSR') {
      bgColor.value = 'text-error-400 bg-error-700'
    }
    if (level == 'SR') {
      bgColor.value = 'text-warning bg-warning-700'
    }
    if (level == 'R') {
      bgColor.value = 'text-primary-400 bg-primary-700'
    }
    if (level == 'N') {
      bgColor.value = 'text-success bg-success-700'
    }
  } else {
    if (level == undefined) {
      bgColor.value = 'text-gray bg-gray-300'
    }
    if (level == 'SSR') {
      bgColor.value = 'text-error bg-error-300'
    }
    if (level == 'SR') {
      bgColor.value = 'text-warning-600 bg-warning-300'
    }
    if (level == 'R') {
      bgColor.value = 'text-primary bg-primary-300'
    }
    if (level == 'N') {
      bgColor.value = 'text-success bg-success-300'
    }
  }
})
</script>

<style scoped></style>
