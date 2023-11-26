<template>
  <div class="production-item">
    <v-autocomplete v-model="selectConvertedValue" density="compact" variant="outlined" item-title="Name" item-value="Id" :items="itemList">
      <template #selection="{ item }">
        <div class="input-selection">
          <v-avatar v-if="item.title">
            <v-img :src="getImageSrc(item.title)" />
          </v-avatar>
          {{ item.title ? item.raw.AlternateName ?? item.title : "Select an item" }}
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
    <v-text-field v-model="internalValue.ItemsPerMinute" variant="outlined" suffix="items/min" class="production-item__production-rate" label="Enter a number" type="number" step="1" density="compact" outlined />
    <v-btn density="default" color="error" icon="mdi-minus" size="x-small" @click="removeHandler" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { Item } from "../Models/Item"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { itemDictionary } from "../Utilities/ItemUtility"
  import { ProductionListItem } from "../Models/ProductionList"
  import { watch } from "vue"

  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    listItem: {
      type: ProductionListItem,
      default: null,
    },
  })

  const emit = defineEmits(["update:listItem", "remove:listItem"])

  const { productionListItems } = storeToRefs(useProductionListStore())
  const internalValue = ref({
    Id: props.listItem.Id,
    ItemsPerMinute: props.listItem.ItemsPerMinute,
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

  watch(internalValue.value, emitUpdate)

  const itemList = Object.values(itemDictionary)
    .filter((item: Item) => !productionListItems.value.some(selectedItem => selectedItem.Id == item.Id))
    .map((item: Item) => {
      return {
        Id: item.Id,
        Name: item.Name,
        AlternateName: item.AlternateName,
      }
    })

  function getImageSrc(name: string) {
    const imageName = name.toLowerCase().split(" ").join("-")
    const imagePath = `/src/assets/items/${imageName}_64.png`
    const imageUrl = new URL(imagePath, import.meta.url)
    return imageUrl.href
  }

  function emitUpdate() {
    emit("update:listItem", internalValue.value)
  }

  function removeHandler() {
    emit("remove:listItem")
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
  }
</style>
