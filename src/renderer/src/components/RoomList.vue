<script setup lang="ts">
import { AllRooms, Room } from '@renderer/data/roomData'
import { ref } from 'vue'
const roomWidth = 120
const rooms = ref([] as Room[])
rooms.value = AllRooms
function roomTransfer(room: Room) {
  rooms.value = AllRooms.filter((x) => x.pid.split(',').indexOf(room.id.toString()) > -1)
}
roomTransfer(rooms.value[0])
</script>
<template>
  <h3 class="text-h4 mx-auto text-center">Room List</h3>
  <v-row justify="center" align="center" class="roomList ma-auto">
    <v-col v-for="(item, index) in rooms" :key="index" cols="auto">
      <v-card @click="roomTransfer(item)">
        <v-img class="align-end text-white" :width="roomWidth" :src="item.bg" cover> </v-img>
        <v-card-subtitle>
          {{ item.name }}
          <v-icon v-show="!item.empty" icon="mdi-account-question-outline"></v-icon>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
