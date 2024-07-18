<script setup lang="ts">
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'

defineOptions({
  name: 'WindowClose'
})
const authStore = useAuthStore()
function closeWindow() {
  authStore.saveArchiveData().then(() => {
    window.electron.ipcRenderer.invoke('close-window')
  })
}
</script>

<template>
  <ButtonIcon :tooltip-content="$t('common.close')" @click="closeWindow">
    <icon-ion:close />
  </ButtonIcon>
</template>

<style scoped></style>
