<script setup lang="ts">
import { useFormRules, useNaiveForm } from '@renderer/hooks/common/form'
import { $t } from '@renderer/locales'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'ResetPwd'
})

interface Emits {
  (e: 'module', module: string): string
}
const emit = defineEmits<Emits>()
const { formRef, validate } = useNaiveForm()

interface FormModel {
  phone: string
  code: string
  password: string
  confirmPassword: string
}

const model: FormModel = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
})

type RuleRecord = Partial<Record<keyof FormModel, App.Global.FormRule[]>>

const rules = computed<RuleRecord>(() => {
  const { formRules, createConfirmPwdRule } = useFormRules()

  return {
    phone: formRules.phone,
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password)
  }
})

async function handleSubmit() {
  await validate()
  // request to reset password
  window.$message?.success($t('page.login.common.validateSuccess'))
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="phone">
      <NInput v-model:value="model.phone" :placeholder="$t('page.login.common.phonePlaceholder')" />
    </NFormItem>
    <NFormItem path="code">
      <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')" />
    </NFormItem>
    <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.confirmPasswordPlaceholder')" />
    </NFormItem>
    <NFlex vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" round block @click="emit('module', 'pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NFlex>
  </NForm>
</template>

<style scoped></style>
