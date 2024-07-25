<template>
  <n-flex vertical :size="24">
    <n-flex v-if="showNewButton" justify="right" class="pr-24 py-4">
      <n-button type="success" @click="saveNewArchive(true)">
        {{ $t('common.add') + $t('route.archive') }}
      </n-button>
      <n-button type="primary" @click="saveNewArchive(false)">
        {{ $t('common.save') + $t('route.archive') }}
      </n-button>
    </n-flex>
    <n-flex v-if="archives && archives.length > 0" class="pa-8">
      <NCard
        v-for="archive in archives"
        :key="archive.id"
        :bordered="false"
        class="relative w-80 rd-12px shadow-primary shadow-op-30">
        <n-thing>
          <template #avatar>
            <image-icon :src="'/static/imgs/' + archive.cover" class="size-24" />
          </template>
          <template #header>
            <n-p class="text-info"> {{ archive.name }}</n-p>
          </template>
          <template #header-extra>
            <icon-pajamas:status-active
              v-if="archive.id == authStore.userInfo.archive.id"
              class="color-success-600" />
          </template>
          <template #description>
            <n-p class="text-info">
              {{ $t('page.archive.playTime') + ': ' + formatSeconds(archive.totalTime) }}
            </n-p>
            <n-p class="text-info">
              {{ $t('page.archive.saveTime') + ': ' + formatTimestamp(archive.saveTime) }}
            </n-p>
          </template>
          <template #action>
            <n-flex justify="space-around">
              <n-button type="primary" @click="loadGame(archive)">{{
                $t('common.confirm')
              }}</n-button>
              <n-button type="error" @click="deleteSelectArchive(archive.id)">
                {{ $t('common.delete') }}
              </n-button>
            </n-flex>
          </template>
        </n-thing>
      </NCard>
    </n-flex>
    <n-empty v-else size="huge" :description="$t('common.empty')" class="mt-60"> </n-empty>
  </n-flex>
</template>

<script setup lang="ts">
import { fetchArchiveList } from '@renderer/service/api/archive'
import { useAuthStore } from '@renderer/store/modules/auth'
import { formatSeconds, formatTimestamp } from '@renderer/utils/common'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const showNewButton = ref(false)
const archives = ref([] as Dto.DbArchiveList)
function archiveList() {
  fetchArchiveList().then((res) => {
    if (authStore.isLogin) {
      archives.value = res.data?.filter((x) => x.name == authStore.userInfo.userName) ?? []
    } else {
      archives.value = res.data
    }
  })
}
function saveNewArchive(isNew: boolean) {
  authStore.saveArchiveData(isNew).then(() => {
    archiveList()
  })
}

function loadGame(archive: Dto.DbArchive) {
  authStore.login(archive.name, archive.id)
}

function deleteSelectArchive(id: number | undefined) {
  if (id != undefined) {
    authStore.deleteArchiveData(id).then(() => {
      archiveList()
    })
  }
}

onMounted(() => {
  archiveList()
  showNewButton.value = authStore.isLogin
})
</script>

<style scoped></style>
