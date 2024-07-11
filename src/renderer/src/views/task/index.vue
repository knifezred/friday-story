<template>
  <n-calendar
    v-model:value="calendar"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue">
    {{ year }}-{{ month }}-{{ date }}
    <n-ul v-if="date == 7">
      <n-li>
        <n-p>
          任务1
          <n-icon class="color-success"> <icon-mynaui:check-circle /> </n-icon>
        </n-p>
      </n-li>
    </n-ul>
  </n-calendar>
</template>

<script setup lang="ts">
import { addDays } from 'date-fns/esm'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const calendar = ref(addDays(Date.now(), 0).valueOf())
function handleUpdateValue(
  timestamp: number,
  { year, month, date }: { year: number; month: number; date: number }
) {
  message.success(`${year}-${month}-${date} ${timestamp}`)
}
function isDateDisabled(timestamp: number) {
  if (timestamp > calendar.value) {
    return true
  }
  return false
}
</script>
