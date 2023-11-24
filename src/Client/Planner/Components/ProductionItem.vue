<template>
  <v-autocomplete v-model="value" density="compact" variant="outlined" class="production-item" item-title="Name" item-value="Name" :items="itemList">
    <template #selection="{ item }">
      <div class="input-selection">
        <v-avatar v-if="item.title">
          <v-img :src="getImageSrc(item.title)" />
        </v-avatar>
        {{ item.title ? item.title : 'Select an item' }}
      </div>
    </template>
    <template #item="{props:itemProps, item }">
      <v-list-item
        :key="item.value"
        :value="item.value"
        :title="item.title"
        v-bind="itemProps"
        :prepend-avatar="getImageSrc(item.title)"
      />
    </template>
  
  </v-autocomplete>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import itemData from "../Data/items.json5"
  import { uniqBy } from "lodash"
  import { Item } from "../Models/Item"
import { useProductionListStore } from "../Stores/productionList";
import { storeToRefs } from "pinia";

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
      return props.modelValue
    },
    set(value) {
      if (value) {
        emit("update:modelValue", value)
      }
    },
  })

  const itemList = uniqBy(itemData.items, "Name")
  .filter((item: Item) => !productionListItems.value.some((selectedItem) => selectedItem.Name == item.Name))
  .map((item: Item) => {
    return {
      Name: item.Name,
    }
  })

  function getImageSrc(name: string){
    const imageName = name.toLowerCase().split(' ').join('-');
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
