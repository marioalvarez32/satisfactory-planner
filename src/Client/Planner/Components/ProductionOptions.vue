<template>
  <v-expansion-panels variant="accordion">
    <SidepanelGroup v-if="selectedNode" title="Node Options" :sub-title="selectedNode.Name">
      <SidepanelGroupContainer title="Node Options">
        <component :is="subOptionsComponent" :key="selectedNode.ItemId" :selected-node="selectedNode" />
      </SidepanelGroupContainer>
    </SidepanelGroup>
    <SidepanelGroup title="Chart Options">
      <SidepanelGroupContainer title="Network Layout">
        <ProductionNetworkLayoutOptions />
      </SidepanelGroupContainer>
    </SidepanelGroup>
  </v-expansion-panels>
</template>

<script setup lang="ts">
  import ProductionNodeOptions from "./ProductionNodeOptions.vue"
  import { useVisualNetwork } from "@/Client/Planner/Composables/useVisualNetwork"
  import { computed } from "vue"
  import SidepanelGroup from "@/Client/Components/Sidepanel/SidepanelGroup.vue"
  import SidepanelGroupContainer from "@/Client/Components/Sidepanel/SidepanelGroupContainer.vue"
  import ProductionNetworkLayoutOptions from "./ProductionNetworkLayoutOptions.vue"

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

<style lang="scss" scoped>
  .options{
    display:flex;
    justify-content: center;
    flex-direction: column;
  }
</style>
