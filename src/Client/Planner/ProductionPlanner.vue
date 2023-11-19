<template>
  <div class="production-planner">
    <ProductionList />
    <ProductionOverview />
  </div>
</template>

<script setup lang="ts">
  import ProductionList from "@/Client/Planner/Components/ProductionList.vue"
  import ProductionOverview from "./Components/ProductionOverview.vue"
</script>

<style lang="scss" scoped>
  .production-planner {
    display: grid;
    grid-template: "production-list overview" 1fr / 525px auto;
    height: calc(100vh - var(--v-layout-top));
    overflow: hidden;
  }
</style>
