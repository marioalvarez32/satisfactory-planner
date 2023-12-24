<template>
  <div class="recipe-table">
    <div class="recipe-table__header">
      <h3>{{ title }}</h3>
      <v-text-field v-model="searchTerm" density="compact" variant="outlined" label="Search" append-inner-icon="mdi-magnify" single-line hide-details />
    </div>
    <Simplebar data-simplebar-auto-hide="false" class="recipe-table__wrapper">
      <v-data-table v-model="internalValue" item-value="Id" class="" :search="searchTerm" :items="items" :headers="headers" show-select :items-per-page="-1" density="compact" :custom-filter="customFilter">
        <template #bottom></template>
        <template #[`item.Item.Name`]="{ item }">
          {{ item.Item.AlternateName ?? item.Item.Name }}
        </template>
        <template #[`item.Input`]="{ item }">
          <div class="recipe-table__production-container recipe-table__production-input">
            <RecipeItem v-for="productionItem in item.Input" :key="productionItem.Name" :table-production-item="productionItem" />
          </div>
        </template>
        <template #[`item.Product`]="{ item }">
          <div class="recipe-table__production-container">
            <RecipeItem :table-production-item="item.Item" />
            <RecipeItem v-for="productionItem in item.Product" :key="productionItem.Name" :table-production-item="productionItem" />
          </div>
        </template>
      </v-data-table>
    </Simplebar>
  </div>
</template>
<script setup lang="ts">
  import { PropType, computed } from "vue"
  import { TableItem } from "./Models/TableItem"
  import RecipeItem from "./RecipeItem.vue"
  import { ref } from "vue"
  import Simplebar from "simplebar-vue"
  import "simplebar-vue/dist/simplebar.min.css"

  const emit = defineEmits(["update:modelValue"])
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array as PropType<string[]>,
      required: true,
    },
  })

  const internalValue = computed({
    get: () => props.modelValue,
    set(val) {
      emit("update:modelValue", val)
    },
  })

  const headers = [
    {
      key: "Item.Name",
      title: "Name",
      value: "Item.Name",
      align: "start",
      minWidth: "170px",
      sortable: true,
    },
    {
      key: "Input",
      title: "Input",
      value: "Item.Input",
      align: "end",
      minWidth: "200px",
      sortable: false,
    },
    {
      key: "Product",
      title: "Product",
      value: "Item.Product",
      align: "start",
      minWidth: "105px",
      sortable: false,
    },
  ]

  const searchTerm = ref("")

  const items = computed(() => {
    return props.recipes.map(id => {
      return new TableItem(id)
    })
  })

  const customFilter = (value, searchTerm, item: { raw: TableItem }) => {
    const hasName = item.raw.Item?.AlternateName?.toLowerCase().includes(searchTerm) || item.raw.Item.Name.toLowerCase().includes(searchTerm)
    const hasInput = item.raw.Input.some(productionItem => productionItem.Name.toLowerCase().includes(searchTerm))
    const hasProduct = item.raw.Product.some(productionItem => productionItem.Name.toLowerCase().includes(searchTerm))
    return hasName || hasInput || hasProduct
  }
</script>

<style lang="scss" scoped>
  .recipe-table {
    height: 100%;
    border:1px solid #535353;
    width: 100%;
  }
  .recipe-table__header{
    display:flex;
    align-items: center;
    gap: 25px;
    padding:10px 20px;
  }
  .recipe-table__production-container{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .recipe-table__wrapper{
    height: calc(100% - 60px);
  }
</style>
