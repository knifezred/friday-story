<script setup lang="ts">
import RoomList from './components/RoomList.vue'
import PanelScene from './components/PanelScene.vue'
import PanelStory from './components/PanelStory.vue'
import PanelAction from './components/PanelAction.vue'
import { SnackbarModel, infoBar } from './utils/MessageTips.ts'
import { ref } from 'vue'
import { useUIStore } from './store/modules/ui'
const uiStore = useUIStore()
const snackbar = ref({} as SnackbarModel)
function showMessage(message: string) {
  snackbar.value = infoBar(message)
  snackbar.value.show = true
}
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-icon="mdi-account-cowboy-hat"
          title="Adams"
          subtitle="finished:20%"
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
    <v-app-bar :title="uiStore.getScene.title">
      <v-chip prepend-icon="mdi-timer" text="2023-10-19"></v-chip>
      <v-btn color="blue-darken-1"> +1h </v-btn>
      <v-btn color="blue-darken-1"> +3h </v-btn>
      <v-btn color="blue-darken-1"> +1d </v-btn>
      <v-btn icon="mdi-cog"></v-btn>
    </v-app-bar>
    <v-main class="align-center justify-center" style="min-height: 500px">
      <PanelScene></PanelScene>
    </v-main>
    <v-navigation-drawer class="right-drawer" location="right">
      <RoomList></RoomList>
      <v-divider></v-divider>
      <PanelAction></PanelAction>
    </v-navigation-drawer>
    <v-footer app name="footer" class="footer-panel">
      <PanelStory></PanelStory>
    </v-footer>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="2000"
      multi-line
      location="top"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-layout>
</template>
<style lang="less">
@import './assets/css/styles.less';
</style>
