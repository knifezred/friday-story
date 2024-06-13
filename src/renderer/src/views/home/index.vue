<template>
  <v-layout class="rounded rounded-md">
    <v-main class="align-center justify-center" style="min-height: 500px">
      <div>home page test</div>

      <v-btn @click="logout">退出登录</v-btn>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped></style>
