<script setup lang="ts">
import { useFormRules, useNaiveForm } from '@renderer/hooks/common/form'
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'GameStart'
})

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
  await authStore.login(model.userName, model.password)
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NSpace vertical :size="24">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('page.login.gameStart.newGame') }}
      </NButton>
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('page.login.gameStart.loadArchive') }}
      </NButton>
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('page.setting.title') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
