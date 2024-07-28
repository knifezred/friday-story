<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { createArchive } from '@renderer/service/api/archive'
import { projectSetting } from '@renderer/settings/projectSetting'
import { useAuthStore } from '@renderer/store/modules/auth'
import { reactive } from 'vue'

defineOptions({
  name: 'Register'
})

const authStore = useAuthStore()
const { toggleLoginModule } = useRouterPush()
const model: Dto.DbArchive = reactive({
  name: '',
  totalTime: 0,
  saveTime: 0,
  cover: 'avatar/man-001.svg',
  data: JSON.stringify(authStore.archivedData),
  place: projectSetting.defaultPlace
})
function handleSubmit() {
  model.saveTime = Date.now()
  model.data = JSON.stringify(authStore.archivedData)
  console.log(model)
  createArchive(model).then((res) => {
    console.log(res)
    if (res.data != null) {
      authStore.login(model.name, res.data.id)
      // request to register
      window.$message?.success($t('page.login.common.validateSuccess'))
    }
  })
}
</script>

<template>
  <NForm size="large" :show-label="false">
    <NFormItem path="name">
      <ImageIconPicker v-model:value="model.cover" type="img" icon="avatar" />
      <NInput
        v-model:value="model.name"
        :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFlex vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" round block @click="toggleLoginModule('game-start')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NFlex>
  </NForm>
</template>
<style scoped></style>
