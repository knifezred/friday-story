<template>
  <div class="media-panel">
    <img v-if="mediaType === 'img'" :src="getMediaSrc" />
    <video v-if="mediaType === 'video'" :src="getMediaSrc" loop autoplay />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  mediaSrc: String,
  mediaType: String
})
console.log('reload')
const getMediaSrc = computed(() => {
  console.log(props.mediaSrc)
  return `../src/assets/${props.mediaSrc}`
  // return new URL(`../src/assets/${props.mediaSrc}`, import.meta.url).href
})
</script>
