<template>
  <div class="production-planner">
    <ProductionTabs />
    <ProductionSidePanel />
    <ProductionOverview />
  </div>
</template>

<script setup lang="ts">
  import ProductionOverview from "./Components/ProductionOverview.vue"
  import ProductionTabs from "./Components/ProductionTabs.vue"
  import ProductionSidePanel from "./Components/ProductionSidePanel.vue"
</script>

<style lang="scss" scoped>
  .production-planner {
    display: grid;
    grid-template: 
      "tabs tabs" 75px
      "production-list overview" / 525px auto;
    height: calc(100vh - var(--v-layout-top));
    overflow: hidden;
    gap: 15px;
    padding: 15px;
  }
</style>
