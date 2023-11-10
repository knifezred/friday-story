<template>
  <v-card class="mx-auto mt-10" elevation="1" max-width="500">
    <img src="../../static/logo.svg" class="login-logo" />
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
        Start or Continue
      </v-btn>

      <v-btn block class="text-none mb-4" color="indigo-darken-3" size="x-large" variant="flat">
        Load Archive
      </v-btn>
      <v-btn block class="text-none mb-4" color="pink-darken-1" size="x-large" variant="flat">
        Exit App
      </v-btn>
      <p>tips: creation by KnifeZ</p>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const loading = ref(false)
const router = useRouter()
watch(loading, (val) => {
  if (!val) return
  setTimeout(() => (loading.value = false), 2000)
})

function startGame() {
  loading.value = !loading.value
  router.push('/index')
}
</script>

<style scoped>
.login-logo {
  background: #283593;
  width: 100%;
  object-fit: scale-down;
  height: 260px;
}
</style>
