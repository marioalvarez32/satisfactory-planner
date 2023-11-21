<template>
  <v-autocomplete v-model="value" variant="outlined" class="production-item" item-title="Name" item-value="Name" :items="itemList" />
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import productionItems from "../Models/test.json"
  import { uniqBy } from "lodash"

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
  const itemList = uniqBy(productionItems.products, "Product").map(item => {
    return {
      Name: item.Product,
    }
  })

  //const itemList = [{ Name: "Iron Plate" }, { Name: "Iron Ingot" }, { Name: "Screw" }, { Name: "Iron Rod" }, { Name: "Iron Ore" }]
</script>

<style lang="scss" scoped></style>
