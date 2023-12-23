<script setup lang="ts">
import { ref } from 'vue'
import { SnackbarModel } from './utils/MessageTips'

const snackbar = ref({} as SnackbarModel)
</script>
<template>
  <div>
    <router-view />
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="2000"
      multi-line
      location="top"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>
<style lang="less">
@import './assets/css/styles.less';
</style>
