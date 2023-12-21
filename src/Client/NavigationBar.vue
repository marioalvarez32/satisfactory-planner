<template>
  <v-app-bar color="surface-variant" :title="`Satisfactory planner: v${version} `" />
</template>

<script setup lang="ts">
  import { version } from "@/../public/internalVersion.json"
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 50px;
    width: 100vw;
    background-color: gray;
  }
</style>
