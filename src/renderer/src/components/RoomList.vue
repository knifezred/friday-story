<template>
  <div class="roomList">
    <h3 class="text-h4 mx-auto text-center">Room List</h3>
    <v-row class="align-start ma-auto">
      <v-col v-for="(item, index) in uiStore.sceneRooms" :key="index" cols="auto">
        <v-card @click="roomTransfer(item)">
          <v-img class="align-end text-white" :width="roomWidth" :src="staticPath(item.bg)" cover>
          </v-img>
          <v-card-subtitle>
            {{ item.name }}
            <v-icon v-show="!item.empty" icon="mdi-account-question-outline"></v-icon>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { staticPath } from '@renderer/utils/PathUtil'
import { useUIStore } from '@renderer/store/modules/ui'
import { Room } from '@renderer/data/roomData'
import { useAppStore } from '@renderer/store/modules/app'
const uiStore = useUIStore()
const appStore = useAppStore()
const roomWidth = 165
function roomTransfer(room: Room) {
  uiStore.setRoom(room)
  // 加载房间人员
  // 加载房间操作
  // 加载图片
}
uiStore.setRoom(undefined)
</script>
