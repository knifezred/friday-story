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
        <n-icon> <icon-game-icons:dice-fire /> </n-icon>
        掷骰子
      </n-h2>
    </n-gi>

    <n-gi> </n-gi>
    <n-gi :span="2"> </n-gi>
    <n-gi> </n-gi>

    <n-gi> </n-gi>
    <n-gi :span="2"> </n-gi>
    <n-gi> </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
// 骰子比大小
defineOptions({
  name: 'DiceNumber'
})
</script>

<style scoped></style>
