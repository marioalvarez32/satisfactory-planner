<template>
  <div class="production-list">
    <div class="production-list__content">
      <div v-for="(item, index) in productionItems" :key="index" class="production-list__item">
        <ProductionItem v-model="item.Name" />
        <v-text-field
          v-model="item.ItemsPerMinute"
          variant="outlined"
          suffix="items/min"
          class="production-list__production-rate"
          label="Enter an Integer"
          type="number"
          step="1"
          outlined
          @input="parseNumber(index)"
        />
        <v-btn density="default" icon="mdi-minus" @click="removeProductionItem(index)" />
      </div>
    </div>
    <v-btn :disabled="shouldDisableAddButton" density="default" icon="mdi-plus" @click="addProductionItem" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, watch, Ref } from "vue"
  import ProductionItem from "@/Client/Planner/Components/ProductionItem.vue"
  import { ProductionListItem } from "../Models/ProductionList"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { useStorage } from "@vueuse/core"

  const { productionItems } = storeToRefs(useProductionListStore())

  const shouldDisableAddButton = computed(() => productionItems.value?.at(-1)?.Name == "")

  const storedItems: Ref<ProductionListItem[]> = useStorage("production-item-list", [], localStorage, { mergeDefaults: true })
  if (storedItems.value && storedItems.value.length > 0) {
    productionItems.value = storedItems.value
  }

  watch(
    productionItems,
    () => {
      storedItems.value = productionItems.value
    },
    { deep: true }
  )
  function addProductionItem() {
    productionItems.value.push(new ProductionListItem())
  }

  function removeProductionItem(index) {
    productionItems.value.splice(index, 1)
  }

  function parseNumber(index) {
    productionItems.value[index].ItemsPerMinute = parseInt(`${productionItems.value[index].ItemsPerMinute}`) || 0
  }
</script>

<style lang="scss" scoped>
  .production-list {
    grid-area: production-list;
    padding: 25px;
    border: 1px solid #dcdcdc;
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
