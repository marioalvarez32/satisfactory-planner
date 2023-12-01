<template>
  <v-card elevation="5" rounded="lg" class="production-list">
    <div v-if="getSelectedListItems" :key="selectedListId" class="production-list__content">
      <ProductionItem v-for="(item, index) in getSelectedListItems" :key="item.Id" :list-item="item" @update:list-item="handleItemUpdate($event, index)" @remove:list-item="removeProductionItem(index)" />
    </div>
    <v-btn :disabled="shouldDisableAddButton" color="primary" density="default" icon="mdi-plus" @click="addProductionItem" />
  </v-card>
</template>

<script setup lang="ts">
  import { computed, watch, Ref } from "vue"
  import ProductionItem from "@/Client/Planner/Components/ProductionItem.vue"
  import { ProductionList, ProductionListItem } from "../Models/ProductionList"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { useStorage } from "@vueuse/core"
  const productionStore = useProductionListStore()
  const { productionLists, getSelectedListItems, selectedListId } = storeToRefs(productionStore)

  const shouldDisableAddButton = computed(() => getSelectedListItems.value?.at(-1)?.Id == "")

  const storedItems: Ref<ProductionList[]> = useStorage("production-list", [], localStorage, { mergeDefaults: true })
  if (storedItems.value && storedItems.value.length > 0) {
    productionLists.value = storedItems.value
  }

  watch(
    productionLists,
    () => {
      storedItems.value = productionLists.value
    },
    { deep: true }
  )

  function addProductionItem() {
    productionLists.value[productionStore.getSelectedListIndex].Items.push(new ProductionListItem())
  }

  function removeProductionItem(index) {
    productionLists.value[productionStore.getSelectedListIndex].Items.splice(index, 1)
  }

  function handleItemUpdate(newValue: ProductionListItem, index: number) {
    productionStore.updateListItemWithIndex(index, newValue)
  }
</script>

<style lang="scss" scoped>
  .production-list {
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .production-list__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
