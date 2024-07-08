<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'

defineOptions({
  name: 'GameStart'
})

const { toggleLoginModule, routerPushByKey } = useRouterPush()
</script>

<template>
  <NSpace vertical :size="24">
    <NButton type="primary" size="large" round block @click="toggleLoginModule('register')">
      {{ $t('page.login.gameStart.newGame') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="routerPushByKey('archive')">
      {{ $t('page.login.gameStart.loadArchive') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="routerPushByKey('setting')">
      {{ $t('page.setting.title') }}
    </NButton>
  </NSpace>
</template>

<style scoped></style>
