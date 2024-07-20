<template>
  <div class="h-100vw">
    <component
      :is="activeModule.component"
      :is-super="authStore.isStaticSuper"
      @result="moduleResult" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@renderer/store/modules/auth'
import type { Component } from 'vue'
import { computed } from 'vue'
import MapScene from './modules/map-scene.vue'
import MiniGame from './modules/mini-game.vue'
import ShopScene from './modules/shop-scene.vue'
import StoryScene from './modules/story-scene.vue'

defineOptions({
  name: 'GameWindow'
})
const authStore = useAuthStore()
interface Props {
  value: UnionKey.SceneModule
}

const props = defineProps<Props>()
interface SceneModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.SceneModule, SceneModule> = {
  map: { label: 'map', component: MapScene },
  'mini-game': { label: 'miniGame', component: MiniGame },
  shop: { label: 'shop', component: ShopScene },
  story: { label: 'story', component: StoryScene }
}

const activeModule = computed(() => moduleMap[props.value || 'map'])

interface Emits {
  (e: 'result', result: boolean): boolean
  (e: 'update:value', result: UnionKey.SceneModule): UnionKey.SceneModule
}
const emit = defineEmits<Emits>()
function moduleResult(result: boolean) {
  emit('update:value', 'map')
  setTimeout(() => {
    emit('result', result)
  }, 100)
}
</script>

<style scoped></style>
