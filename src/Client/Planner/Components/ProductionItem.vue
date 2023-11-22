<template>
  <v-autocomplete v-model="value" variant="outlined" class="production-item" item-title="Name" item-value="Name" :items="itemList" />
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

  //const itemList = [{ Name: "Iron Plate" }, { Name: "Iron Ingot" }, { Name: "Screw" }, { Name: "Iron Rod" }, { Name: "Iron Ore" }]
</script>

<style lang="scss" scoped></style>
