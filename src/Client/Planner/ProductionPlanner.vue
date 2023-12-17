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
  import { useNetworkDataStore } from "./Stores/networkData"
  import { toRefs } from "vue"
  import { watch } from "vue"
  import { Ref } from "vue"
  import { NodePositionData } from "./Models/NodePositionData"
  import { useStorage } from "@vueuse/core"

  const { nodePositions } = toRefs(useNetworkDataStore())

  const storedItems: Ref<NodePositionData[]> = useStorage("production-list-node-positions", [], localStorage, { mergeDefaults: true })
  if (storedItems.value && storedItems.value.length > 0) {
    nodePositions.value = storedItems.value
  }

  watch(
    nodePositions,
    () => {
      storedItems.value = nodePositions.value
    },
    { deep: true }
  )
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
