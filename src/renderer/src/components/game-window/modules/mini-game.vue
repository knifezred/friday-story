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
import { useGameStore } from '@renderer/store/modules/game'
import type { Component } from 'vue'
import { computed } from 'vue'
import DiceNumberGame from '../mini-games/dice-number-game.vue'
import FingerGuessingGame from '../mini-games/finger-guessing-game.vue'
import MatchThreeGame from '../mini-games/match-three-game.vue'

defineOptions({
  name: 'MiniGame'
})

const gameStore = useGameStore()
const authStore = useAuthStore()

interface MiniGameModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.MiniGameModule, MiniGameModule> = {
  'dice-number': { label: 'FingerGuessing', component: DiceNumberGame },
  'finger-guessing': { label: 'FingerGuessing', component: FingerGuessingGame },
  'match-three': { label: 'FingerGuessing', component: MatchThreeGame }
}

const activeModule = computed(() => moduleMap[gameStore.currentMiniGame || 'finger-guess'])

interface Emits {
  (e: 'result', result: boolean): boolean
}
const emit = defineEmits<Emits>()
function gameResult(result: boolean) {
  setTimeout(() => {
    emit('result', result)
  }, 100)
}
</script>

<style scoped></style>
