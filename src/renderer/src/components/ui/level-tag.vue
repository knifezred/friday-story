<template>
  <n-avatar :round="round" :bordered="false" :class="bgColor">
    {{ level == undefined ? '???' : level }}
  </n-avatar>
</template>

<script setup lang="ts">
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
const bgColor = ref('bg-gray-200 text-gray')
onMounted(() => {
  if (level == undefined) {
    bgColor.value = 'bg-gray-200 text-gray'
  }
  if (level == 'SSR') {
    bgColor.value = 'bg-error-200 text-error'
  }
  if (level == 'SR') {
    bgColor.value = 'bg-warning-200 text-warning'
  }
  if (level == 'R') {
    bgColor.value = 'bg-info-200 text-info'
  }
  if (level == 'N') {
    bgColor.value = 'bg-success-200 text-success'
  }
})
</script>

<style scoped></style>
