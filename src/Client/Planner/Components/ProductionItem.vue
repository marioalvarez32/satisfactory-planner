<template>
  <v-autocomplete v-model="value" class="production-item" clearable label="Autocomplete" item-title="Name" item-value="Name" :items="itemList" />
</template>

<script setup lang="ts">
  import { computed } from "vue"

  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
  })
  const emit = defineEmits(["update:modelValue"])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit("update:modelValue", value)
    },
  })
  const itemList = [{ Name: "Iron Plate" }, { Name: "Iron Ingot" }, { Name: "Screw" }, { Name: "Iron Rod" }]
</script>

<style lang="scss" scoped></style>
