<template>
  <div class="media-panel">
    <img v-if="mediaType === 'img'" :src="getMediaSrc" />
    <video v-if="mediaType === 'video'" :src="getMediaSrc" loop autoplay />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { staticPath } from '../utils/PathUtil'
const props = defineProps({
  mediaSrc: String,
  mediaType: String
})
const getMediaSrc = computed(() => {
  return staticPath(props.mediaSrc as string)
})
</script>
