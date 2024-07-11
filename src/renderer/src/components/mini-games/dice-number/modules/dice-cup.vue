<template>
  <n-flex>
    <Dice
      v-for="dice in diceCount"
      :key="dice"
      :is-roll="isRolling"
      @dice-number="getDiceNumber"></Dice>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dice from './dice.vue'
// 骰子比大小
defineOptions({
  name: 'DiceCup'
})
// const isRolling = ref(false)
const rollIndex = ref(0)
const totalPoints = ref(0)
interface Props {
  diceCount: number
  isRolling: boolean
}
const props = withDefaults(defineProps<Props>(), {
  diceCount: 5,
  isRolling: false
})

interface Emits {
  (e: 'rolling-result', result: number): number
}

const emit = defineEmits<Emits>()
watch(
  [() => props.isRolling],
  () => {
    if (props.isRolling) {
      rollDice()
    }
  },
  { immediate: true }
)

function getDiceNumber(number) {
  rollIndex.value = rollIndex.value + 1
  totalPoints.value += number
  if (rollIndex.value == props.diceCount) {
    emit('rolling-result', totalPoints.value)
  }
}

function rollDice() {
  rollIndex.value = 0
  totalPoints.value = 0
}
</script>

<style scoped></style>
