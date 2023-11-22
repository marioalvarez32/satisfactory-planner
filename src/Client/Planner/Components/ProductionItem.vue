<template>
  <v-autocomplete v-model="value" variant="outlined" class="production-item" item-title="Name" item-value="Name" :items="itemList">
  
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
  import itemData from "../Data/items.json"
  import { uniqBy } from "lodash"
  import { Item } from "../Models/Item"

  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
  })
  const emit = defineEmits(["update:modelValue"])

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
  const itemList = uniqBy(itemData.items, "Name").map((item: Item) => {
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

<style lang="scss" scoped></style>
