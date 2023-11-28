<template>
  <v-card elevation="5" rounded="lg" class="production-tabs">
    <div class="production-tabs__title">
      <v-text-field v-if="selectedList" v-model="selectedList.Name" label="Enter a tab title" variant="outlined" density="compact" hide-details />
    </div>
    <div class="production-tabs__container">
      <v-tabs stacked bg-color="teal-darken-3" show-arrows slider-color="teal-lighten-3" @update:model-value="handleTabSelection($event)">
        <v-tab v-for="list in productionLists" :key="list.Id" :value="list.Id">{{ list.Name }}</v-tab>
      </v-tabs>
    </div>
    <div class="production-tabs__tab-actions">
      <v-btn color="primary" density="default" icon="mdi-plus" @click="addTab" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useProductionListStore } from "../Stores/productionList"
  import { ProductionList } from "../Models/ProductionList"
  import { toRefs } from "vue"

  const productionStore = useProductionListStore()
  const { productionLists } = toRefs(productionStore)

  const selectedList = productionLists.value[productionStore.getSelectedListIndex]

  if (productionLists.value.length == 0) {
    const initialTab = new ProductionList("Main")
    productionLists.value.push(initialTab)
    productionStore.setSelectedList(initialTab.Id)
  }

  function addTab() {
    productionLists.value.push(new ProductionList())
  }

  function handleTabSelection(newListId) {
    productionStore.setSelectedList(newListId)
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
