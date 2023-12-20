<template>
  <v-app-bar color="surface-variant" :title="`Satisfactory planner: ${version}`" />
</template>

<script setup lang="ts">
  import { version } from "../../internalVersion.json"
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 50px;
    width: 100vw;
    background-color: gray;
  }
</style>
