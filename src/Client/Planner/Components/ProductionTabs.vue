<template>
  <v-card elevation="5" rounded="lg" class="production-tabs">
    <div class="production-tabs__title">
      <v-text-field v-if="selectedListName" v-model="selectedListName" label="Enter a tab title" variant="outlined" density="compact" hide-details />
    </div>
    <div class="production-tabs__container">
      <v-tabs v-model="selectedListId" stacked bg-color="teal-darken-3" show-arrows slider-color="teal-lighten-3" @update:model-value="() => (selectedNode = null)">
        <v-tab v-for="list in productionLists" :key="list.Id" :value="list.Id">{{ list.Name }}</v-tab>
      </v-tabs>
    </div>
    <div class="production-tabs__tab-actions">
      <v-btn color="primary" density="default" icon="mdi-plus" @click="addTab" />
      <v-btn :disabled="shouldDisableRemoveTab" color="error" density="default" icon="mdi-minus" @click="productionStore.removeSelectedList()" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useProductionListStore } from "../Stores/productionList"
  import { ProductionList } from "../Models/ProductionList"
  import { useVisualNetwork } from "../Composables/useVisualNetwork"
  import { computed } from "vue"
  import { storeToRefs } from "pinia"

  const productionStore = useProductionListStore()
  const { productionLists, selectedListId } = storeToRefs(productionStore)

  const selectedListName = computed({
    get() {
      return productionLists.value[productionStore.getSelectedListIndex]?.Name
    },
    set(value) {
      productionLists.value[productionStore.getSelectedListIndex].Name = value
    },
  })
  const { selectedNode } = useVisualNetwork()
  const shouldDisableRemoveTab = computed(() => productionLists.value.length <= 1)

  if (productionLists.value.length == 0) {
    const initialTab = new ProductionList("Main")
    productionLists.value.push(initialTab)
  }

  function addTab() {
    productionLists.value.push(new ProductionList())
  }
</script>

<style lang="scss" scoped>
  .production-tabs {
    grid-area: tabs;
    display:flex;
  }

  .production-tabs__title {
    display:flex;
    align-items: center;
    padding: 10px;
    flex-basis: 25%;
  }

  .production-tabs__tab-actions {
    flex-basis: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .production-tabs__container {
    flex-basis:65%;
    max-width:65%;
    display: flex; 
    justify-content: center;
    align-items: center;
  }
</style>
