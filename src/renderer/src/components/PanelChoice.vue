<template>
  <v-container>
    <v-list density="compact" nav>
      <v-list-item title="choose 1" value="1" @click="executeAction('imgs/t1.webp')"></v-list-item>
      <v-list-item title="choose 2" value="2" @click="goScene('imgs/t2.webp')"></v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { useUIStore } from '@renderer/store/modules/ui'

const uiStore = useUIStore()
function executeAction(src: string) {
  uiStore.setScene(src)
  uiStore.setStory('clicked action ' + src)
}

function goScene(src: string) {
  uiStore.setScene(src)
  uiStore.setStory('clicked action ' + src)
}
// action 场景、人物、物品、story、
</script>

<style scoped></style>
