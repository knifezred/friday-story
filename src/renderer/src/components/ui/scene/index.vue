<template>
  <div>
    <ImageIcon v-if="map != undefined && map.cover != ''" :icon="map.cover" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Scene'
})

interface Props {
  type: 'map' | 'action'
  map: UI.MapItem
}

withDefaults(defineProps<Props>(), {
  type: 'map'
})
</script>

<style scoped></style>
