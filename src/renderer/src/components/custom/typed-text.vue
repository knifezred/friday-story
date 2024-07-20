<template>
  {{ text }}
</template>

<script setup lang="ts">
import projectSetting from '@renderer/settings/projectSetting'
import { ref, watch } from 'vue'

defineOptions({
  name: 'TypedText'
})
const text = ref('')
const index = ref(0)
interface Props {
  strings: string
  speed?: number
  loop?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  speed: projectSetting.textSpeed,
  loop: false
})
const typeWriter = () => {
  if (index.value < props.strings.length) {
    text.value += props.strings.charAt(index.value)
    index.value++
    setTimeout(typeWriter, props.speed)
  } else if (props.loop && index.value == props.strings.length) {
    setTimeout(() => {
      text.value = ''
      index.value = 0
      typeWriter()
    }, 1000)
  }
}

watch(
  [() => props.strings],
  () => {
    text.value = ''
    index.value = 0
    typeWriter()
  },
  { immediate: true }
)
</script>

<style scoped></style>
