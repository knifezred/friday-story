<template>
  <div class="text-panel">
    {{ uiStore.getStory }}
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@renderer/store/modules/ui'
const uiStore = useUIStore()
</script>
