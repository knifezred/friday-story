<template>
  <n-image :src="staticPath(icon)" preview-disabled></n-image>
</template>

<script setup lang="ts">
import { staticPath } from '@renderer/utils/common'
defineOptions({
  name: 'ImageIcon'
})
interface Props {
  icon: string
}
defineProps<Props>()
</script>

<style scoped></style>
