<template>
  <div>
    <image-icon v-if="map != undefined && map.cover != ''" :src="map.cover" />
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
