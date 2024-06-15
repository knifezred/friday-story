<script setup lang="ts">
import { useFormRules, useNaiveForm } from '@renderer/hooks/common/form'
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { useAuthStore } from '@renderer/store/modules/auth'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'GameStart'
})

const authStore = useAuthStore()
const { toggleLoginModule } = useRouterPush()
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
      <NButton
        type="primary"
        size="large"
        round
        block
        :loading="authStore.loginLoading"
        @click="handleSubmit">
        {{ $t('page.login.gameStart.newGame') }}
      </NButton>
      <NButton
        type="warning"
        size="large"
        round
        block
        :loading="authStore.loginLoading"
        @click="handleSubmit">
        {{ $t('page.login.gameStart.loadArchive') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
