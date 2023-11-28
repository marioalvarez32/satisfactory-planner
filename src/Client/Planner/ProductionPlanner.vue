<template>
  <div class="production-planner">
    <ProductionTabs />
    <ProductionList />
    <ProductionOverview />
  </div>
</template>

<script setup lang="ts">
  import ProductionList from "@/Client/Planner/Components/ProductionList.vue"
  import ProductionOverview from "./Components/ProductionOverview.vue"
  import ProductionTabs from "./Components/ProductionTabs.vue"
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
