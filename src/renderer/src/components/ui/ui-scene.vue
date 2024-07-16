<template>
  <div
    :style="'background-image: url(http://localhost:5175' + map.cover + ');padding-top: 56.25%;'"
    class="bg-repeat-round"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UiScene'
})

interface Props {
  map: Dto.MapItem
}
defineProps<Props>()
</script>

<style scoped></style>
