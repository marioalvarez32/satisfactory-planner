<template>
  <div class="" :disabled="filteredTabs.length <= 1">
    Node Type: {{ selectedNode.Type }}
    <v-checkbox v-model="isItemExported" label="Export Node" />
    <v-autocomplete v-if="isItemExported" v-model="exportedTo" density="compact" variant="outlined" item-title="Name" item-value="Id" :items="filteredTabs" />
    {{ selectedItem }}
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { useProductionListStore } from "../Stores/productionList"
  import { watch } from "vue"
  const props = defineProps({
    selectedNode: {
      type: Object,
      required: true,
    },
  })
  const { getListItemById, updateListItemWithId, productionLists, selectedListId } = useProductionListStore()

  const filteredTabs = computed(() => productionLists.filter(list => list.Id != selectedListId))
  const selectedItem = computed(() => {
    return getListItemById(props.selectedNode.ItemId)
  })

  const isItemExported = ref(selectedItem.value?.IsExported)
  const exportedTo = ref(selectedItem.value?.ExportedTo)

  watch([isItemExported, exportedTo], updateListItem)

  function updateListItem() {
    if (exportedTo.value == null) {
      exportedTo.value = filteredTabs.value.at(0).Id
    }
    if (isItemExported.value == false) {
      exportedTo.value = null
    }
    updateListItemWithId(selectedItem.value.Id, {
      Id: selectedItem.value.Id,
      IsExported: isItemExported.value,
      Name: selectedItem.value.Name,
      ItemsPerMinute: selectedItem.value.ItemsPerMinute,
      ExportedTo: exportedTo.value,
    })
  }
</script>

<style lang="scss" scoped></style>
