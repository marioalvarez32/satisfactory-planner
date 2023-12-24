<template>
  <div class="production-item">
    <v-autocomplete v-model="selectConvertedValue" density="compact" variant="outlined" item-title="Name" item-value="Id" :items="itemList">
      <template #selection="{ item }">
        <div class="input-selection">
          <v-avatar v-if="item.title">
            <v-img :src="getImageSrc(item.title)" />
          </v-avatar>
          <div class="input-selection__label" :title="getSelectedItemLabel(item)">{{ getSelectedItemLabel(item) }}</div>
        </div>
      </template>
      <template #item="{ props: itemProps, item }">
        <v-list-item :key="item.value" v-bind="itemProps" title="test" :prepend-avatar="getImageSrc(item.title)">
          <template #title>
            <div class="input-selection">
              {{ item.raw.AlternateName ?? item.title }}
            </div>
          </template>
        </v-list-item>
      </template>
    </v-autocomplete>
    <v-text-field v-model="internalItemsPerMinute" variant="outlined" suffix="items/min" class="production-item__production-rate" label="Enter a number" type="number" step="1" density="compact" outlined />
    <v-btn density="default" color="error" icon="mdi-minus" size="x-small" @click="removeHandler" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { useProductionListStore } from "../Stores/productionList"
  import { itemDictionary, getImageSrc } from "../Utilities/ItemUtility"
  import { ProductionListItem } from "../Models/ProductionList"
  import { watch } from "vue"
  import { PropType } from "vue"
  import { useRecipeOptionStore } from "../Stores/recipeOptions"
  import { toRefs } from "vue"

  const props = defineProps({
    listItem: {
      type: Object as PropType<ProductionListItem>,
      default: null,
    },
  })

  const emit = defineEmits(["update:listItem", "remove:listItem"])
  const productionStore = useProductionListStore()

  const internalValue = ref<ProductionListItem>({
    Id: props.listItem.Id,
    Name: props.listItem.Name,
    ItemsPerMinute: props.listItem.ItemsPerMinute,
    IsExported: props.listItem.IsExported,
    ExportedTo: props.listItem.ExportedTo,
  })

  const selectConvertedValue = computed({
    get() {
      return itemDictionary[props.listItem.Id] ? itemDictionary[props.listItem.Id] : ""
    },
    set(value) {
      if (value) {
        internalValue.value.Id = value
      }
    },
  })

  const internalItemsPerMinute = computed({
    get() {
      return internalValue.value.ItemsPerMinute
    },
    set(value) {
      if (value && value >= 0) {
        internalValue.value.ItemsPerMinute = value
      }
    },
  })

  watch(internalValue.value, emitUpdate)
  const { isItemEnabled } = toRefs(useRecipeOptionStore())
  const itemList = computed(() => {
    return Object.values(itemDictionary)
      .filter(item => isItemEnabled.value(item.Id))
      .filter(item => {
        return !productionStore.getSelectedList.Items.some((selectedItem: ProductionListItem) => selectedItem.Id == item.Id)
      })
      .map(item => {
        return {
          Id: item.Id,
          Name: item.Name,
          AlternateName: item.AlternateName,
        }
      })
  })

  function emitUpdate() {
    emit("update:listItem", internalValue.value)
  }

  function removeHandler() {
    emit("remove:listItem")
  }

  function getSelectedItemLabel(item) {
    return item.title ? item.raw.AlternateName ?? item.title : "Select an item"
  }
</script>

<style lang="scss" scoped>
  .production-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .production-item__production-rate {
    max-width: 200px;
    min-width:200px;
  }

  .production-item :deep(.v-input__details) {
    display: none;
  }

  .input-selection{
    display:flex;
    align-items: center;
    gap: 5px;
    overflow: hidden;
  }

  .input-selection__label{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }


  :deep(.v-autocomplete .v-field__input) {
    flex-wrap: nowrap;
}
</style>
