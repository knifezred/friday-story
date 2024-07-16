<template>
  <div class="h-100vw pt-12">
    <component
      :is="activeModule.component"
      :is-super="authStore.isStaticSuper"
      @game-result="gameResult" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@renderer/store/modules/auth'
import type { Component } from 'vue'
import { computed } from 'vue'
import DiceNumberGame from './modules/dice-number-game.vue'
import FingerGuessingGame from './modules/finger-guessing-game.vue'
import MatchThreeGame from './modules/match-three-game.vue'

defineOptions({
  name: 'MiniGame'
})
const authStore = useAuthStore()
interface Props {
  /** The login module */
  module?: UnionKey.MiniGameModule
}

const props = defineProps<Props>()
interface MiniGameModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.MiniGameModule, MiniGameModule> = {
  'dice-number': { label: 'FingerGuessing', component: DiceNumberGame },
  'finger-guessing': { label: 'FingerGuessing', component: FingerGuessingGame },
  'match-three': { label: 'FingerGuessing', component: MatchThreeGame }
}

const activeModule = computed(() => moduleMap[props.module || 'finger-guess'])

interface Emits {
  (e: 'game-result', result: boolean): boolean
}
const emit = defineEmits<Emits>()
function gameResult(result: boolean) {
  setTimeout(() => {
    emit('game-result', result)
  }, 100)
}
</script>

<style scoped></style>
