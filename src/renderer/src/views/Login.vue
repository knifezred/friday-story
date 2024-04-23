<template>
  <v-card class="mx-auto mt-16" elevation="1" max-width="500">
    <img src="../../static/logo2.png" class="login-logo" />
    <v-card-title class="py-5 font-weight-black">Fridayboot Electron</v-card-title>

    <v-card-text> Open-source App for free. just for fun </v-card-text>

    <v-card-text>
      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="grey-darken-3"
        size="x-large"
        variant="flat"
        @click="startGame"
      >
        Start
      </v-btn>
      <v-btn
        block
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        @click="showArchiveList"
      >
        Load Archive
      </v-btn>
      <v-btn block class="text-none mb-4" color="pink-darken-1" size="x-large" variant="flat">
        <!-- TODO 退出应用 -->
        Exit App
      </v-btn>
      <p>tips: creation by KnifeZ</p>
    </v-card-text>
  </v-card>
  <v-bottom-sheet v-model="archiveSheet">
    <v-list>
      <v-list-subheader>Load Archive in</v-list-subheader>
      <v-list-item
        v-for="item in archives"
        :key="item.id"
        :title="item.title"
        @click="loadArchive(item.id)"
      ></v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>
<script setup lang="ts">
import { Archive } from '@renderer/data/entities'
import { useAppStore } from '@renderer/store/modules/app'
import { useDbStore } from '@renderer/store/modules/db'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const loading = ref(false)
const archiveSheet = ref(false)
const router = useRouter()
watch(loading, (val) => {
  if (!val) return
  setTimeout(() => (loading.value = false), 2000)
})
const dbStore = useDbStore()
const appStore = useAppStore()
let archives = [] as Archive[]
dbStore.loadArchiveList().then((list) => {
  archives = list
})

function startGame() {
  loading.value = !loading.value
  appStore.loadSaveData(0).then(() => {
    router.push('/index')
  })
}
function loadArchive(id: number) {
  console.log('load archive')
  appStore.loadSaveData(id).then(() => {
    router.push('/index')
  })
  archiveSheet.value = false
}
function showArchiveList() {
  archiveSheet.value = true
}
</script>

<style scoped>
.login-logo {
  background: #283593;
  width: 100%;
  object-fit: scale-down;
  height: 200px;
}
</style>
