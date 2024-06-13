<template>
  <div>
    about page

    <v-btn @click="logout">退出登录</v-btn>
  </div>
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
