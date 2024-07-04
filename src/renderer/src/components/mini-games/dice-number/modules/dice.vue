<template>
  <ButtonIcon
    text
    :icon="`${'game-icons:perspective-dice-six-faces-' + dicePoint}`"
    style="font-size: 48px"
    @click="rollDice" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 骰子
defineOptions({
  name: 'SingleDice'
})
type DicePoint = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'random'
const dicePoint = ref<DicePoint>('five')
const diceNumber = ref<number>(1)

interface Props {
  isRoll: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isRoll: false
})

interface Emits {
  (e: 'DiceNumber', result: number): boolean
}
const emit = defineEmits<Emits>()

watch(
  [() => props.isRoll],
  () => {
    if (props.isRoll) {
      rollDice()
    }
  },
  { immediate: true }
)

function rollDice() {
  let i = 0
  const points: DicePoint[] = ['one', 'two', 'three', 'four', 'five', 'six']
  const rollAnimation = () => {
    diceNumber.value = Math.floor(Math.random() * points.length) + 1
    dicePoint.value = points[diceNumber.value - 1]
    setTimeout(() => {
      if (i < 20) {
        i = i + 1
        rollAnimation()
      } else {
        emit('DiceNumber', diceNumber.value)
      }
    }, 50)
  }
  rollAnimation()
}
</script>

<style scoped></style>
