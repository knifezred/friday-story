<template>
  <div>
    <h1>石头剪刀布游戏</h1>
    <p>你的分数: {{ playerScore }}</p>
    <p>电脑的分数: {{ computerScore }}</p>
    <p>当前轮次: {{ currentRound }} / {{ totalRounds }}</p>
    <div v-if="currentRound <= totalRounds && !isChoosing && currentRound > 0">
      <p>
        电脑:
        <ButtonIcon :icon="`${'la:hand-' + computerChoice}`" />
        你:
        <ButtonIcon :icon="`${'la:hand-' + playerChoice}`" />
      </p>
      <p>结果: {{ result }}</p>
    </div>
    <n-result v-if="gameEnded" :status="`${playerScore > computerScore ? 'success' : 'error'}`">
      <template #default>
        <n-h1 v-if="playerScore != computerScore" class="text-center">
          {{ playerScore > computerScore ? '你赢了!' : '你输了!' }}
        </n-h1>
        <n-h1 v-else class="text-center">平局!</n-h1>
      </template>
      <template #footer>
        <n-button @click="startGame"> 再来一局 </n-button>
      </template>
    </n-result>
    <n-button v-if="currentRound == 0" @click="startGame">开始游戏</n-button>
    <div v-else-if="!gameEnded && currentRound > 0">
      <ButtonIcon icon="la:hand-rock" @click="makeChoice('rock')" />
      <ButtonIcon icon="la:hand-scissors" @click="makeChoice('scissors')" />
      <ButtonIcon icon="la:hand-paper" @click="makeChoice('paper')" />
    </div>
    <div v-for="(play, index) in history" :key="index">
      <h2>对局历史</h2>
      <p>
        你：
        <ButtonIcon :icon="`${'la:hand-' + play.playerChoice}`" /> 积分： {{ play.playerScore }};
        电脑：
        <ButtonIcon :icon="`${'la:hand-' + play.computerChoice}`" /> 积分：
        {{ play.computerScore }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 猜拳（石头剪刀布）
defineOptions({
  name: 'FingerGuessing'
})

type Choice = 'rock' | 'paper' | 'scissors'

const playerScore = ref(0)
const computerScore = ref(0)
const currentRound = ref(0)
const totalRounds = ref(3)
const playerChoice = ref<Choice | null>(null)
const computerChoice = ref<Choice | null>(null)
const result = ref<string>('')
const isChoosing = ref(false)
const gameEnded = ref(false)
const history = ref([])

function startGame() {
  if (totalRounds.value > 0) {
    currentRound.value = 1
    playerScore.value = 0
    computerScore.value = 0
    gameEnded.value = false
    isChoosing.value = false
    playerChoice.value = null
    result.value = ''
  }
}

function getRandomChoice(): Choice {
  const choices: Choice[] = ['rock', 'paper', 'scissors']
  return choices[Math.floor(Math.random() * choices.length)]
}

function makeChoice(choice: Choice) {
  if (currentRound.value <= totalRounds.value && !isChoosing.value) {
    console.log(choice)
    isChoosing.value = true
    playerChoice.value = choice
    computerChoice.value = getRandomChoice()
    determineResult()
  }
}

function determineResult() {
  if (playerChoice.value === computerChoice.value) {
    result.value = '平局!'
  } else if (
    (playerChoice.value === 'rock' && computerChoice.value === 'scissors') ||
    (playerChoice.value === 'paper' && computerChoice.value === 'rock') ||
    (playerChoice.value === 'scissors' && computerChoice.value === 'paper')
  ) {
    playerScore.value++
    result.value = '你赢了!'
  } else {
    computerScore.value++
    result.value = '你输了!'
  }
  history.value.push({
    playerChoice: playerChoice.value,
    computerChoice: computerChoice.value,
    playerScore: playerScore.value,
    computerScore: computerScore.value
  } as never)
  if (currentRound.value < totalRounds.value) {
    nextRound()
  } else {
    gameEnded.value = true
  }
}

function nextRound() {
  currentRound.value++
  isChoosing.value = false
  // playerChoice.value = null
  result.value = ''
}
</script>

<style scoped></style>
