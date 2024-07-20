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
        <ButtonIcon text icon="streamline:peace-hand"></ButtonIcon>
        {{ $t('miniGame.finger-guessing') }}
      </n-h2>
    </n-gi>
    <n-gi> </n-gi>

    <n-gi>
      <n-h3>
        {{ playerName1 }}
        <n-icon v-for="index in totalRounds" :key="index">
          <icon-solar:star-bold v-if="computerScore >= index" color="#fcc419" />
          <icon-solar:star-bold-duotone v-else />
        </n-icon>
      </n-h3>
    </n-gi>
    <n-gi :span="2">
      <n-h3> {{ $t('miniGame.currentRound') }}: {{ currentRound }} </n-h3>
    </n-gi>
    <n-gi>
      <n-h3>
        {{ playerName2 }}
        <n-icon v-for="index in totalRounds" :key="index">
          <icon-solar:star-bold v-if="playerScore >= index" color="#fcc419" />
          <icon-solar:star-bold-duotone v-else />
        </n-icon>
      </n-h3>
    </n-gi>

    <n-gi v-if="currentRound > 0">
      <ButtonIcon text :icon="`${'la:hand-' + computerChoice}`" style="font-size: 48px" />
    </n-gi>
    <n-gi v-if="currentRound > 0" :span="2">
      <n-result v-if="gameEnded" :status="`${playerScore > computerScore ? 'success' : 'error'}`">
        <n-h1 v-if="playerScore != computerScore" class="text-center">
          {{
            playerScore > computerScore
              ? $t('miniGame.gameResult.youWin')
              : $t('miniGame.gameResult.youLose')
          }}
        </n-h1>
        <n-h1 v-else class="text-center">{{ $t('miniGame.gameResult.equal') }}</n-h1>
        <template v-if="isSuper" #footer>
          <n-flex justify="center">
            <n-button @click="startGame"> {{ $t('miniGame.playAgain') }} </n-button>
            <n-button @click="endGame"> {{ $t('miniGame.endGame') }} </n-button>
          </n-flex>
        </template>
      </n-result>
      <n-h3 v-else>{{ $t(result) }}</n-h3>
    </n-gi>

    <n-gi v-if="currentRound > 0">
      <ButtonIcon text :icon="`${'la:hand-' + playerChoice}`" style="font-size: 48px" />
    </n-gi>

    <n-gi> </n-gi>
    <n-gi :span="2">
      <n-button v-if="currentRound == 0" @click="startGame">{{
        $t('miniGame.startGame')
      }}</n-button>
      <n-flex v-else-if="!gameEnded && currentRound > 0" justify="space-around" size="large">
        <n-button text style="font-size: 64px" @click="makeChoice('rock')">
          <n-icon>
            <icon-la:hand-rock />
          </n-icon>
        </n-button>
        <n-button text style="font-size: 64px" @click="makeChoice('scissors')">
          <n-icon>
            <icon-la:hand-scissors />
          </n-icon>
        </n-button>
        <n-button text style="font-size: 64px" @click="makeChoice('paper')">
          <n-icon>
            <icon-la:hand-paper />
          </n-icon>
        </n-button>
      </n-flex>
    </n-gi>
    <n-gi> </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 猜拳（石头剪刀布）
defineOptions({
  name: 'FingerGuessingGame'
})

type Choice = 'rock' | 'paper' | 'scissors'
const playerScore = ref(0)
const computerScore = ref(0)
const currentRound = ref(0)
const playerChoice = ref<Choice | null>(null)
const computerChoice = ref<Choice | null>(null)
const result = ref<string>('')
const gameEnded = ref(false)
const history = ref([])

interface Props {
  isSuper: boolean
  playerName1?: string
  playerName2?: string
  totalRounds: number
  value: boolean
}
const { totalRounds, isSuper } = withDefaults(defineProps<Props>(), {
  playerName1: '电脑',
  playerName2: '你',
  totalRounds: 3
})
interface Emits {
  (e: 'game-result', result: boolean): boolean
}

const emit = defineEmits<Emits>()

function startGame() {
  if (totalRounds > 0) {
    currentRound.value = 1
    playerScore.value = 0
    computerScore.value = 0
    gameEnded.value = false
    playerChoice.value = null
    computerChoice.value = null
    result.value = ''
    history.value = []
  }
}

function endGame() {
  emit('game-result', playerScore.value > computerScore.value)
}

function getRandomChoice(): Choice {
  const choices: Choice[] = ['rock', 'paper', 'scissors']
  return choices[Math.floor(Math.random() * choices.length)]
}

function makeChoice(choice: Choice) {
  if (canPlay()) {
    playerChoice.value = choice
    computerChoice.value = getRandomChoice()
    determineResult()
  }
}

function determineResult() {
  if (playerChoice.value === computerChoice.value) {
    result.value = 'miniGame.gameResult.equal'
  } else if (
    (playerChoice.value === 'rock' && computerChoice.value === 'scissors') ||
    (playerChoice.value === 'paper' && computerChoice.value === 'rock') ||
    (playerChoice.value === 'scissors' && computerChoice.value === 'paper')
  ) {
    playerScore.value++
    result.value = 'miniGame.gameResult.youWin'
  } else {
    computerScore.value++
    result.value = 'miniGame.gameResult.youLose'
  }
  history.value.push({
    playerChoice: playerChoice.value,
    computerChoice: computerChoice.value,
    playerScore: playerScore.value,
    computerScore: computerScore.value
  } as never)
  if (canPlay()) {
    nextRound()
  } else {
    gameEnded.value = true
    if (!isSuper) {
      endGame()
    }
  }
}

function nextRound() {
  currentRound.value++
  // playerChoice.value = null
  // result.value = ''
}

function canPlay() {
  return playerScore.value < totalRounds && computerScore.value < totalRounds
}
</script>

<style scoped></style>
