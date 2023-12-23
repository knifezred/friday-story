<template>
  <div class="roomList">
    <div>
      <h3 class="text-h4 mx-auto text-center">Room List</h3>
    </div>
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
import { Room } from '@renderer/data/entities'
const uiStore = useUIStore()
const roomWidth = 160
function roomTransfer(room: Room) {
  uiStore.setRoom(room.id)
  // 更新时间

  // 加载房间人员

  // 加载房间操作

  // 加载图片
}
</script>
