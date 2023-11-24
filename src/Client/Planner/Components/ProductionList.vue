<template>
  <v-card elevation="5" rounded="lg" class="production-list">
    <div class="production-list__content">
      <div v-for="(item, index) in productionListItems" :key="index" class="production-list__item">
        <ProductionItem v-model="item.Name" />
        <v-text-field
          v-model="item.ItemsPerMinute"
          variant="outlined"
          suffix="items/min"
          class="production-list__production-rate"
          label="Enter an Integer"
          type="number"
          step="1"
          density="compact"
          outlined
          @input="parseNumber(index)"
        />
        <v-btn density="default" color="error" icon="mdi-minus" size="x-small" @click="removeProductionItem(index)" />
      </div>
    </div>
    <v-btn :disabled="shouldDisableAddButton" color="primary" density="default" icon="mdi-plus"  @click="addProductionItem" />
  </v-card>
</template>

<script setup lang="ts">
  import { computed, watch, Ref } from "vue"
  import ProductionItem from "@/Client/Planner/Components/ProductionItem.vue"
  import { ProductionListItem } from "../Models/ProductionList"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { useStorage } from "@vueuse/core"

  const { productionListItems } = storeToRefs(useProductionListStore())

  const shouldDisableAddButton = computed(() => productionListItems.value?.at(-1)?.Name == "")

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

  function parseNumber(index) {
    productionListItems.value[index].ItemsPerMinute = parseInt(`${productionListItems.value[index].ItemsPerMinute}`) || 0
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

  .production-list__item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .production-list__production-rate {
    max-width: 200px;
  }
  .production-list :deep(.v-input__details) {
    display: none;
  }
</style>
