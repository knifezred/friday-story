<template>
  <div>Demo Page {{ info }}</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
defineOptions({
  name: 'Demo'
})

const result = ref<number>(0)

interface Props {
  loading: boolean
  info: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  info: 'Demo'
})

interface Emits {
  (e: 'emit-result', result: number): number
}
const emit = defineEmits<Emits>()

watch(
  [() => props.loading],
  () => {
    if (props.loading) {
      emit('emit-result', result.value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  console.log('page mounted')
})

onUnmounted(() => {
  console.log('page unmounted')
})
</script>

<style scoped></style>
