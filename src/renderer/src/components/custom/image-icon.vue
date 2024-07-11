<template>
  <n-image :src="staticPath(src)" preview-disabled></n-image>
</template>

<script setup lang="ts">
import { staticPath } from '@renderer/utils/common'
defineOptions({
  name: 'ImageIcon'
})
interface Props {
  src: string
}
defineProps<Props>()
</script>

<style scoped></style>
