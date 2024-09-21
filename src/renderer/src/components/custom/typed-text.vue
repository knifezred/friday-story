<template>
  <div v-html="text"></div>
</template>

<script setup lang="ts">
import { extractAndAppendDynamicText } from '@renderer/hooks/game/renpy'
import { projectSetting } from '@renderer/settings/projectSetting'
import { useAppStore } from '@renderer/store/modules/app'
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
const appStore = useAppStore()
const props = withDefaults(defineProps<Props>(), {
  speed: projectSetting.textSpeed,
  loop: false
})

interface Emits {
  (e: 'update:value', result: boolean): boolean
}
const emit = defineEmits<Emits>()
const tagMappings = {
  '{color=': (color: string) => `<span style='color:${color}'>`,
  '{/color}': '</span>',
  '{image=': (src: string) => `<img src="${appStore.projectSettings.localhost}${src}"/>`,
  '{b}': '<strong>',
  '{/b}': '</strong>',
  '{i}': '<i>',
  '{/i}': '</i>',
  '{u}': '<u>',
  '{/u}': '</u>'
}
const typeWriter = () => {
  if (index.value < props.strings.length) {
    if (props.strings[index.value] == '{') {
      const tempText = props.strings.substring(index.value)
      // 假设tempText以}结尾，我们只需要第一个{}块
      const styleEnd = tempText.indexOf('}')
      if (styleEnd > -1) {
        const style = tempText.substring(0, styleEnd + 1)
        // 尝试从映射中获取对应的HTML标签
        const htmlTag = tagMappings[style.slice(0, style.indexOf('=') + 1)] || tagMappings[style]
        if (htmlTag) {
          // 如果需要处理特殊的参数（如颜色或图片路径），则传递参数
          if (typeof htmlTag === 'function') {
            text.value += htmlTag(style.substring(style.indexOf('=') + 1, styleEnd))
          } else {
            text.value += htmlTag
          }
          index.value += style.length
        }
      } else {
        index.value++
      }
    } else if (props.strings[index.value] == '[') {
      // 解析文本中的动态参数
      const tempText = props.strings.substring(index.value)
      const dynamicParam = tempText.split(']')[0]
      text.value += extractAndAppendDynamicText(dynamicParam.substring(1))
      index.value += dynamicParam.length + 1
    } else {
      text.value += props.strings.charAt(index.value)
      index.value++
    }
    if (!props.value) {
      if (index.value < props.strings.length) {
        setTimeout(typeWriter, 1)
      }
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
