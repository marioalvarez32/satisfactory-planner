<template>
  <v-card elevation="5" rounded="lg" class="production-side-panel">
    <div class="production-sidep-panel__tabs">
      <v-tabs v-model="selectedPanelTab" bg-color="primary" centered>
        <v-tab value="production-tab">Proudtion input</v-tab>
        <v-tab value="options">Options</v-tab>
      </v-tabs>
    </div>
    <div class="production-side-panel__content">
      <v-window v-model="selectedPanelTab">
        <v-window-item value="production-tab">
          <ProductionList />
        </v-window-item>
        <v-window-item value="options">
          <ProductionOptions />
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import ProductionList from "@/Client/Planner/Components/ProductionList.vue"
  import ProductionOptions from "@/Client/Planner/Components/ProductionOptions.vue"

  const selectedPanelTab = ref("production-tab")
</script>

<style lang="scss" scoped>
  .production-side-panel {
      grid-area: production-list;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  
    .production-side-panel__content {
      height: calc(100% - var(--v-tabs-height));
      overflow-y: auto;
    }

    .production-sidep-panel__tabs :deep(button.v-tab){
        text-transform: capitalize;
    }
</style>
