<template>
  <div v-if="selectedNode" class="">
    Node Type: {{ selectedNode.Type }}
    <component :is="subOptionsComponent" :key="selectedNode.ItemId" :selected-node="selectedNode" />
  </div>
</template>

<script setup lang="ts">
  import ProductionNodeOptions from "./ProductionNodeOptions.vue"
  import { useVisualNetwork } from "@/Client/Planner/Composables/useVisualNetwork"
  import { computed } from "vue"

  const { selectedNode: selectedNetworkNode } = useVisualNetwork()
  const selectedNode = computed(() => selectedNetworkNode.value)

  const subOptionsComponent = computed(() => {
    switch (selectedNode.value.Type) {
      case "Node":
        return ProductionNodeOptions
      default:
        return null
    }
  })
</script>

<style lang="scss" scoped></style>
