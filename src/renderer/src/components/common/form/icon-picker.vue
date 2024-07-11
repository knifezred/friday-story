<template>
  <NSpace>
    <n-image
      class="w-16 h-16 cursor-pointer"
      :src="staticPath('/static/imgs/' + currentIcon)"
      preview-disabled
      @click="activate('right')"></n-image>
  </NSpace>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content>
      <NSpace v-if="type == 'img'">
        <n-image
          v-for="item in icons"
          :key="item"
          class="w-16 h-16 cursor-pointer"
          :src="staticPath('/static/imgs/' + item)"
          preview-disabled
          @click="selectIcon(item)"></n-image>
      </NSpace>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { formatNumber, staticPath } from '@renderer/utils/common'
import { DrawerPlacement } from 'naive-ui'
import { ref } from 'vue'
defineOptions({ name: 'IconPicker' })
const active = ref(false)
const placement = ref<DrawerPlacement>('right')
const activate = (place: DrawerPlacement) => {
  active.value = true
  placement.value = place
}
const currentIcon = ref('')

interface Props {
  value: string | null
  type: 'img' | 'icon'
  icon: 'avatar'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'img',
  icon: 'avatar'
})

interface Emits {
  (e: 'update:value', result: string): string
}
const emit = defineEmits<Emits>()

const icons: string[] = []
if (props.icon == 'avatar') {
  for (let index = 1; index < 27; index++) {
    icons.push('avatar/man-' + formatNumber(index, 3) + '.svg')
  }
  for (let index = 1; index < 25; index++) {
    icons.push('avatar/woman-' + formatNumber(index, 3) + '.svg')
  }
  currentIcon.value = icons[0]
}

function selectIcon(icon) {
  currentIcon.value = icon
  active.value = false
  emit('update:value', currentIcon.value)
  console.log(currentIcon.value)
}
</script>

<style scoped></style>
