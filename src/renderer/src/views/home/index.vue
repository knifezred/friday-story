<template>
  <NSpace>
    <NCard :bordered="false" class="relative w-auto rd-12px">
      <FingerGuessing :total-rounds="3" @game-result="gameResult"></FingerGuessing>
    </NCard>
    <NCard :bordered="false" class="relative w-auto rd-12px">
      <DiceNumber></DiceNumber>
    </NCard>
  </NSpace>
</template>

<script setup lang="ts">
import DiceNumber from '@renderer/components/mini-games/dice-number/index.vue'
import FingerGuessing from '@renderer/components/mini-games/finger-guessing/index.vue'
defineOptions({
  name: 'Home'
})

function gameResult(result: boolean) {
  console.log(result)
}
</script>

<style scoped></style>
