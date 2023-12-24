<template>
  <div class="production-item">
    <v-avatar v-if="tableProductionItem.Name" :title="tableProductionItem.Name" size="30">
      <v-img :src="getImageSrc(tableProductionItem.Name)" />
    </v-avatar>
    <div class="production-item__item-rate">
      <p>X</p>
      <p>{{ tableProductionItem.ItemsPerMinute }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { PropType } from "vue"
  import { TableProductionItem } from "./Models/TableItem"
  import { getImageSrc } from "../../Utilities/ItemUtility"

  defineProps({
    tableProductionItem: {
      type: Object as PropType<TableProductionItem>,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .production-item{
    display:flex;
    align-items: center;
    gap: 3px;
  }

  .production-item__item-rate{
    display:flex;
    gap: 3px;
  }
</style>
