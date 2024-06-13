<template>
  <v-card class="mx-auto mt-16" elevation="1" max-width="500">
    <v-img :src="IconLogo" class="login-logo" />
    <v-card-title class="py-5 font-weight-black">Fridayboot Electron</v-card-title>

    <v-card-text> Open-Source App for free. just for fun </v-card-text>

    <v-card-text>
      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="grey-darken-3"
        size="x-large"
        variant="flat"
        @click="startGame">
        Start
      </v-btn>
      <v-btn
        block
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        @click="showArchiveList">
        Load Archive
      </v-btn>
      <v-btn block class="text-none mb-4" color="pink-darken-1" size="x-large" variant="flat">
        <!-- TODO 退出应用 -->
        Exit App
      </v-btn>
      <p>tips: creation by KnifeZ</p>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import IconLogo from '@renderer/assets/static/icons/logo.png'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const loading = ref(false)
const archiveSheet = ref(false)
const router = useRouter()
watch(loading, (val) => {
  if (!val) return
  setTimeout(() => (loading.value = false), 2000)
})

function startGame() {
  loading.value = !loading.value
  localStorage.setItem('token', '123123')
  router.push('/home')
}
function showArchiveList() {
  archiveSheet.value = true
}
</script>

<style scoped>
.login-logo {
  background: #484b60;
  width: 100%;
  object-fit: scale-down;
  height: 200px;
}
</style>
