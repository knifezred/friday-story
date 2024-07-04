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
    <n-gi :span="2">
      <DiceCup :dice-count="5" :is-rolling="rolling" @rolling-result="rollingResult"></DiceCup>
    </n-gi>
    <n-gi> 点数：{{ totalPoints }}</n-gi>

    <n-gi> </n-gi>
    <n-gi :span="2">
      <n-button @click="rollingDice"> 开一局 </n-button>
    </n-gi>
    <n-gi> </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DiceCup from './modules/dice-cup.vue'
// 骰子比大小
defineOptions({
  name: 'DiceNumber'
})
const rolling = ref(false)
const totalPoints = ref(0)
function rollingDice() {
  rolling.value = true
  totalPoints.value = 0
}

function rollingResult(points: number) {
  rolling.value = false
  totalPoints.value = points
}
</script>

<style scoped></style>
