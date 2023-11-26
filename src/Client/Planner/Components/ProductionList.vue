<template>
  <v-card elevation="5" rounded="lg" class="production-list">
    <div class="production-list__content">
      <ProductionItem v-for="(item, index) in productionListItems" :key="index" :list-item="item" @update:list-item="handleItemUpdate($event, index)" @remove:list-item="removeProductionItem(index)" />
    </div>
    <v-btn :disabled="shouldDisableAddButton" color="primary" density="default" icon="mdi-plus" @click="addProductionItem" />
  </v-card>
</template>

<script setup lang="ts">
  import { computed, watch, Ref } from "vue"
  import ProductionItem from "@/Client/Planner/Components/ProductionItem.vue"
  import { ProductionListItem } from "../Models/ProductionList"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { useStorage } from "@vueuse/core"
  const productionListStore = useProductionListStore()
  const { productionListItems } = storeToRefs(productionListStore)

  const shouldDisableAddButton = computed(() => productionListItems.value?.at(-1)?.Id == "")

  const storedItems: Ref<ProductionListItem[]> = useStorage("production-item-list", [], localStorage, { mergeDefaults: true })
  if (storedItems.value && storedItems.value.length > 0) {
    productionListItems.value = storedItems.value
  }

  watch(
    productionListItems,
    () => {
      storedItems.value = productionListItems.value
    },
    { deep: true }
  )
  function addProductionItem() {
    productionListItems.value.push(new ProductionListItem())
  }

  function removeProductionItem(index) {
    productionListItems.value.splice(index, 1)
  }

  function handleItemUpdate(newValue: ProductionListItem, index: number) {
    productionListStore.updateListItem(index, newValue)
  }
</script>

<style lang="scss" scoped>
  .production-list {
    grid-area: production-list;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    overflow-y: auto;
    height: 100%;
  }

  .production-list__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
