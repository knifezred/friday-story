<script setup lang="ts">
import RoomList from './components/RoomList.vue'
import PanelMedia from './components/PanelMedia.vue'
import PanelStory from './components/PanelStory.vue'
import { ref } from 'vue'
const snackbar = ref(false)
const snackMessage = ref('')
function showMessage(message: string) {
  snackbar.value = true
  snackMessage.value = message
}
let dateKey = Date.now()
let currentRoomName = ''
currentRoomName = 'Application Bar'
const mediaSrc = ref('imgs/th.jpg')
const mediaType = ref('img')
let story = 'hello Electron'
function executeAction(src: string) {
  mediaSrc.value = src
  dateKey = Date.now()
  story = 'clicked action ' + src
  if (src === null || src === undefined) {
    mediaType.value = 'img'
  } else if (src.endsWith('mp4')) {
    mediaType.value = 'video'
    showMessage('video load ok')
  } else {
    mediaType.value = 'img'
  }
}
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-icon="mdi-account-cowboy-hat"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Relationship"
          value="relationship"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        <v-list-item
          prepend-icon="mdi-format-list-checks"
          title="任务列表"
          value="task"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-history" title="历史记录" value="history"></v-list-item>
        <v-list-item prepend-icon="mdi-all-inclusive" title="loop" value="loop"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :title="currentRoomName">
      <v-chip prepend-icon="mdi-timer" text="2023-10-19"></v-chip>
      <v-btn color="blue-darken-1"> +1h </v-btn>
      <v-btn color="blue-darken-1"> +3h </v-btn>
      <v-btn color="blue-darken-1"> +1d </v-btn>
      <v-btn icon="mdi-cog"></v-btn>
    </v-app-bar>
    <v-main class="align-center justify-center" style="min-height: 500px">
      <PanelMedia :key="dateKey" :media-src="mediaSrc" :media-type="mediaType"></PanelMedia>
    </v-main>
    <v-navigation-drawer location="right" :width="600">
      <RoomList></RoomList>
      <v-divider></v-divider>
      <v-container>
        <v-list density="compact" nav>
          <v-list-item
            title="Show video"
            value="1"
            @click="executeAction('imgs/video.mp4')"
          ></v-list-item>
          <v-list-item
            title="Show img"
            value="2"
            @click="executeAction('imgs/th.jpg')"
          ></v-list-item>
          <v-list-item
            title="Show banner"
            value="3"
            @click="executeAction('imgs/banner.jpg')"
          ></v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-footer app name="footer">
      <PanelStory :story="story"></PanelStory>
    </v-footer>
    <v-snackbar
      v-model="snackbar"
      color="deep-purple-accent-4"
      :timeout="2000"
      multi-line
      location="top"
    >
      {{ snackMessage }}
    </v-snackbar>
  </v-layout>
</template>
<style lang="less">
@import './assets/css/styles.less';
</style>
