<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'

defineOptions({
  name: 'GameStart'
})

interface Emits {
  (e: 'module', module: string): string
}
const emit = defineEmits<Emits>()
const { routerPushByKey } = useRouterPush()
</script>

<template>
  <NFlex vertical :size="24">
    <NButton type="primary" size="large" round block @click="emit('module', 'register')">
      {{ $t('page.login.gameStart.newGame') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="routerPushByKey('archive')">
      {{ $t('page.login.gameStart.loadArchive') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="routerPushByKey('gallery')">
      {{ $t('page.login.gameStart.gallery') }}
    </NButton>
    <NButton type="primary" size="large" round block @click="routerPushByKey('setting')">
      {{ $t('page.setting.title') }}
    </NButton>
  </NFlex>
</template>

<style scoped></style>
