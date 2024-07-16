<template>
  <n-grid
    :x-gap="12"
    :y-gap="12"
    :cols="4"
    layout-shift-disabled
    class="text-center"
    style="min-width: 500px">
    <n-gi> </n-gi>
    <n-gi :span="2">
      <n-h2>
        <n-icon> <icon-streamline-emojis:game-dice /> </n-icon>
        掷骰子
      </n-h2>
    </n-gi>
    <n-gi> </n-gi>

    <n-gi> </n-gi>
    <n-gi :span="2" class="text-center">
      <DiceCup
        :dice-count="totalDice"
        :is-rolling="rolling"
        @rolling-result="rollingCount"></DiceCup>
    </n-gi>
    <n-gi> </n-gi>
    <n-gi> </n-gi>
    <n-gi :span="2">
      <n-result v-if="totalPoints > 0" :status="`${gameEnded ? 'success' : 'error'}`">
        <n-h2 class="text-center">点数：{{ totalPoints }}</n-h2>
        <n-h1 class="text-center">{{ result }}</n-h1>
        <template v-if="isSuper" #footer>
          <n-flex justify="center">
            <n-button @click="startGame"> 再来一局 </n-button>
            <n-button @click="endGame"> 结束 </n-button>
          </n-flex>
        </template>
      </n-result>
      <n-flex v-else justify="center">
        <n-button @click="rollingDice('big')"> 猜大 </n-button>
        <n-button @click="rollingDice('small')"> 猜小 </n-button>
      </n-flex>
    </n-gi>
    <n-gi> </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DiceCup from './dice-cup.vue'
// 骰子比大小
defineOptions({
  name: 'DiceNumberGame'
})
const rolling = ref(false)
const totalPoints = ref(0)
const result = ref<string>('')
const chooseType = ref('')
const gameEnded = ref(false)
interface Props {
  isSuper: boolean
  totalDice: number
}
const { isSuper } = withDefaults(defineProps<Props>(), {
  totalDice: 5
})
interface Emits {
  (e: 'game-result', result: boolean): boolean
}
const emit = defineEmits<Emits>()
function startGame() {
  totalPoints.value = 0
}
function endGame() {
  emit('game-result', gameEnded.value)
}

function rollingDice(choose: string) {
  chooseType.value = choose
  rolling.value = true
  totalPoints.value = 0
}

function rollingCount(points: number) {
  rolling.value = false
  totalPoints.value = points
  let res = totalPoints.value <= 18
  if (chooseType.value == 'big') {
    res = totalPoints.value > 18
  }
  if (res) {
    result.value = '你赢了'
    gameEnded.value = true
  } else {
    result.value = '你输了'
    gameEnded.value = false
  }
  if (!isSuper) {
    endGame()
  }
}
</script>

<style scoped></style>
