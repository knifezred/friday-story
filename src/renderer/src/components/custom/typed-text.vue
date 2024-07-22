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
  value: boolean
  strings: string
  speed?: number
  loop?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  speed: projectSetting.textSpeed,
  loop: false
})

interface Emits {
  (e: 'update:value', result: boolean): boolean
}
const emit = defineEmits<Emits>()

const typeWriter = () => {
  if (index.value < props.strings.length) {
    text.value += props.strings.charAt(index.value)
    index.value++
    if (!props.value) {
      index.value = props.strings.length
      text.value = props.strings
    } else {
      setTimeout(typeWriter, props.speed)
    }
  } else if (index.value == props.strings.length) {
    emit('update:value', false)
    if (props.loop) {
      setTimeout(() => {
        text.value = ''
        index.value = 0
        typeWriter()
      }, 1000)
    }
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
