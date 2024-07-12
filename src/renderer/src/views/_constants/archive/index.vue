<template>
  <n-flex vertical :size="24">
    <n-flex v-if="archives && archives.length > 0" class="py-2 px-4">
      <NCard
        v-for="archive in archives"
        :key="archive.id"
        :bordered="false"
        class="relative z-4 w-auto rd-12px text-center">
        <image-icon :src="'/static/imgs/' + archive.cover" class="w-32 h-32" />
        <n-divider />
        <NAlert :title="archive.name" type="info" :bordered="false">
          <n-p> 保存时间：{{ formatTimestamp(archive.saveTime) }} </n-p>
          <n-p> 游玩时间：{{ formatSeconds(archive.totalTime) }}</n-p>
        </NAlert>
        <n-flex class="py-2" justify="space-around">
          <n-button type="primary" @click="loadGame(archive)">Start</n-button>
          <n-button type="error" @click="deleteSelectArchive(archive.id)">Delete</n-button>
        </n-flex>
      </NCard>
    </n-flex>
    <n-empty v-else size="huge" description="还没有存档" class="mt-60"> </n-empty>
  </n-flex>
</template>

<script setup lang="ts">
import { deleteArchive, fetchArchiveList } from '@renderer/service/api/archive'
import { useAuthStore } from '@renderer/store/modules/auth'
import { formatSeconds, formatTimestamp } from '@renderer/utils/common'
import { ref } from 'vue'

const authStore = useAuthStore()
const archives = ref([] as Dto.DbArchiveList)
function archiveList() {
  fetchArchiveList().then((res) => {
    archives.value = res.data
  })
}

function loadGame(archive: Dto.DbArchive) {
  authStore.login(archive.name, archive.id)
}

function deleteSelectArchive(id: number | undefined) {
  if (id != undefined) {
    deleteArchive(id).then(() => {
      archiveList()
    })
  }
}
archiveList()
</script>

<style scoped></style>
