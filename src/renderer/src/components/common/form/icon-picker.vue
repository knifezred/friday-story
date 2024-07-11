<template>
  <NSpace>
    <ImageIcon
      class="w-16 h-16 cursor-pointer"
      :icon="'/static/imgs/' + currentIcon"
      @click="activate('right')">
    </ImageIcon>
  </NSpace>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content>
      <n-scrollbar>
        <NSpace v-if="type == 'img'">
          <ImageIcon
            v-for="item in icons"
            :key="item"
            :icon="'/static/imgs/' + item"
            class="w-24 h-24 cursor-pointer"
            @click="selectIcon(item)"></ImageIcon>
        </NSpace>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { formatNumber } from '@renderer/utils/common'
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
