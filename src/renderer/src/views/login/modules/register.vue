<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { reactive } from 'vue'

defineOptions({
  name: 'Register'
})

const { toggleLoginModule } = useRouterPush()

interface FormModel {
  phone: string
  code: string
  userName: string
}

const model: FormModel = reactive({
  phone: '',
  code: '',
  userName: ''
})

async function handleSubmit() {
  // request to register
  window.$message?.success($t('page.login.common.validateSuccess'))
}
</script>

<template>
  <NForm size="large" :show-label="false">
    <NFormItem path="userName">
      <NInput
        v-model:value="model.userName"
        show-password-on="click"
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
