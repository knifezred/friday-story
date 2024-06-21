<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'

defineOptions({
  name: 'GameStart'
})

const authStore = useAuthStore()
const { toggleLoginModule } = useRouterPush()

async function handleSubmit() {
  await authStore.login('userName', 'password')
}
</script>

<template>
  <NSpace vertical :size="24">
    <NButton type="primary" size="large" round block @click="toggleLoginModule('register')">
      {{ $t('page.login.gameStart.newGame') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="handleSubmit">
      {{ $t('page.login.gameStart.loadArchive') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="handleSubmit">
      {{ $t('page.setting.title') }}
    </NButton>
  </NSpace>
</template>

<style scoped></style>
