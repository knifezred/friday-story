<script setup lang="ts">
import { useAppStore } from '@renderer/store/modules/app'
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import { createTextVNode, defineComponent } from 'vue'

defineOptions({
  name: 'AppProvider'
})
const appStore = useAppStore()
const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$loadingBar = useLoadingBar()
      window.$dialog = useDialog()
      window.$message = useMessage()
      window.$notification = useNotification()
    }

    register()

    return () => createTextVNode()
  }
})
</script>

<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider :placement="appStore.messagePlacement" container-class="mt-10">
          <ContextHolder />
          <slot></slot>
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<style scoped></style>
