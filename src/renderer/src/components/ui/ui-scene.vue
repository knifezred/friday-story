<template>
  <div
    :style="'background-image: url(http://localhost:5175' + map.cover + ');padding-top: 56.25%;'"
    class="bg-repeat-round">
    <!-- <image-icon v-if="map != undefined && map.cover != ''" :src="map.cover" /> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UiScene'
})

interface Props {
  map: UI.MapItem
}
defineProps<Props>()
</script>

<style scoped></style>
