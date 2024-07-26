<template>
  <NFlex>
    <NCard :bordered="false" class="w-full">
      <n-grid x-gap="12" :cols="4">
        <n-gi></n-gi>
        <n-gi>
          <n-h4 class="!my-1">
            {{ $t('icon.lang') }}
          </n-h4>
        </n-gi>
        <n-gi>
          <n-select
            v-model:value="appStore.locale"
            :options="appStore.localeOptions"
            label-field="label"
            value-field="key"
            @update:value="appStore.changeLocale(appStore.locale)" />
        </n-gi>
        <n-gi></n-gi>
      </n-grid>
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/store/modules/app'

const appStore = useAppStore()
</script>

<style scoped></style>
