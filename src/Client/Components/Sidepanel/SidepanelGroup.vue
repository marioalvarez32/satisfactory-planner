<template>
  <v-expansion-panel :title="props.title">
    <v-expansion-panel-text>
      <slot></slot>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<style lang="scss" scoped></style>
