<template>
  <n-avatar :round="round" :class="bgColor">
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
const bgColor = ref('bg-gray')
onMounted(() => {
  if (level == undefined) {
    bgColor.value = 'bg-gray'
  }
  if (level == 'SSR') {
    bgColor.value = 'bg-error'
  }
  if (level == 'SR') {
    bgColor.value = 'bg-warning'
  }
  if (level == 'R') {
    bgColor.value = 'bg-info'
  }
  if (level == 'N') {
    bgColor.value = 'bg-success'
  }
})
</script>

<style scoped></style>
