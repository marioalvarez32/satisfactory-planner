<template>
  <v-autocomplete v-model="value" density="compact" variant="outlined" class="production-item" item-title="Name" item-value="Id" :items="itemList">
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
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { Item } from "../Models/Item"
  import { useProductionListStore } from "../Stores/productionList"
  import { storeToRefs } from "pinia"
  import { itemDictionary } from "../Utilities/ItemUtility"

  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
  })

  const emit = defineEmits(["update:modelValue"])
  const { productionListItems } = storeToRefs(useProductionListStore())
  const value = computed({
    get() {
      return itemDictionary[props.modelValue] ? itemDictionary[props.modelValue] : ""
    },
    set(value) {
      if (value) {
        emit("update:modelValue", value)
      }
    },
  })

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
</script>

<style lang="scss" scoped>
  .input-selection{
    display:flex;
    align-items: center;
    gap: 5px;
  }
</style>
