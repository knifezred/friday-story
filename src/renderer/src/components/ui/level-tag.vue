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
const bgLevel = themeStore.themeScheme == 'dark' ? '700' : '200'
const bgColor = ref('bg-gray-' + bgLevel + ' text-gray')
onMounted(() => {
  if (level == undefined) {
    bgColor.value = 'bg-gray-' + bgLevel + ' text-gray'
  }
  if (level == 'SSR') {
    bgColor.value = 'bg-error-' + bgLevel + ' text-error-400'
  }
  if (level == 'SR') {
    bgColor.value = 'bg-warning-' + bgLevel + ' text-warning'
  }
  if (level == 'R') {
    bgColor.value = 'bg-primary-' + bgLevel + ' text-primary'
  }
  if (level == 'N') {
    bgColor.value = 'bg-success-' + bgLevel + ' text-success'
  }
})
</script>

<style scoped></style>
