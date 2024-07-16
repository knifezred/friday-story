<template>
  <n-tag :type="levelType" strong :bordered="false" class="mr-1">
    {{ level == undefined ? '???' : level }}
  </n-tag>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'LevelTag'
})
interface Props {
  level?: Dto.LevelType | undefined
}
type Type = 'default' | 'success' | 'error' | 'primary' | 'info' | 'warning' | undefined
const { level } = defineProps<Props>()
const levelType = ref<Type>('success')

onMounted(() => {
  if (level == undefined) {
    levelType.value = 'default'
  }
  if (level == 'SSR') {
    levelType.value = 'error'
  }
  if (level == 'SR') {
    levelType.value = 'warning'
  }
  if (level == 'R') {
    levelType.value = 'info'
  }
  if (level == 'N') {
    levelType.value = 'success'
  }
})
</script>

<style scoped></style>
