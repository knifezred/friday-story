<template>
  <div class="media-panel">
    <img v-if="scene.type === 'img'" :src="staticPath(scene.src)" />
    <video v-if="scene.type === 'video'" :src="staticPath(scene.src)" loop autoplay />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '@renderer/store/modules/ui'
import { staticPath } from '@renderer/utils/PathUtil'

const uiStore = useUIStore()
const scene = ref(uiStore.getScene)
</script>
