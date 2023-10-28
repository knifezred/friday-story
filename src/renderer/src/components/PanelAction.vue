<template>
  <v-container>
    <v-list density="compact" nav>
      <v-list-item
        title="Show video"
        value="1"
        @click="executeAction('imgs/test3.jpg')"
      ></v-list-item>
      <v-list-item
        title="Show img"
        value="2"
        @click="executeAction('imgs/test1.jpg')"
      ></v-list-item>
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
</script>

<style scoped></style>
