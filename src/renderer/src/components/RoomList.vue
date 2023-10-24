<template>
  <h3 class="text-h4 mx-auto text-center">Room List</h3>
  <v-row class="roomList ma-auto">
    <v-col v-for="(item, index) in rooms" :key="index" cols="auto">
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
</template>
<script setup lang="ts">
import { staticPath } from '@renderer/utils/PathUtil'
import { useUIStore } from '@renderer/store/modules/ui'
import { AllRooms, Room } from '@renderer/data/roomData'
import { ref } from 'vue'
const uiStore = useUIStore()
const roomWidth = 120
const rooms = ref([] as Room[])
rooms.value = AllRooms
function roomTransfer(room: Room) {
  // 更新room列表
  rooms.value = AllRooms.filter((x) => x.pid.split(',').indexOf(room.id.toString()) > -1)
  uiStore.setScene(room.bg)
  // 显示房间描述
  uiStore.setStory(room.description)
  // 加载房间人员
  // 加载房间操作
  // 加载图片
}
roomTransfer(rooms.value[0])
</script>
