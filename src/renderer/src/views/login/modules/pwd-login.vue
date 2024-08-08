<script setup lang="ts">
import { loginModuleRecord } from '@renderer/constants/app'
import { useFormRules, useNaiveForm } from '@renderer/hooks/common/form'
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'PwdLogin'
})

interface Emits {
  (e: 'module', module: string): string
}
const emit = defineEmits<Emits>()

const authStore = useAuthStore()
const { formRef, validate } = useNaiveForm()

interface FormModel {
  userName: string
  password: string
}

const model: FormModel = reactive({
  userName: 'Soybean',
  password: '123456'
})

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules()

  return {
    userName: formRules.userName,
    password: formRules.pwd
  }
})

async function handleSubmit() {
  await validate()
  await authStore.login(model.userName, 0)
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="userName">
      <NInput
        v-model:value="model.userName"
        :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')" />
    </NFormItem>
    <NFlex vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
        <NButton quaternary @click="emit('module', 'reset-pwd')">
          {{ $t('page.login.pwdLogin.forgetPassword') }}
        </NButton>
      </div>
      <NButton
        type="primary"
        size="large"
        round
        block
        :loading="authStore.loginLoading"
        @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <div class="flex-y-center justify-between gap-12px">
        <NButton class="flex-1" block @click="emit('module', 'register')">
          {{ $t(loginModuleRecord.register) }}
        </NButton>
      </div>
    </NFlex>
  </NForm>
</template>

<style scoped></style>
