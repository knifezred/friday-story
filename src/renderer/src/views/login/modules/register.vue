<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { createArchive } from '@renderer/service/api/archive'
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
  cover: '',
  data: '{}',
  place: 0
})
function handleSubmit() {
  model.saveTime = Date.now()
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
      <IconPicker v-model:value="model.cover" type="img" icon="avatar" />
      <NInput
        v-model:value="model.name"
        :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NSpace vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" round block @click="toggleLoginModule('game-start')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NSpace>
  </NForm>
</template>
<style scoped></style>
