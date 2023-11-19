<template>
  Production Overview
  <div v-for="(item, index) in products" :key="index">{{ item.Name }} X {{ item.Total }}</div>
  <div ref="networkElement" style="height: 600px"></div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from "vue"
  import { storeToRefs } from "pinia"
  import { useProductionListStore } from "../Stores/productionList"
  import { Production } from "../Models/Production"
  import production from "../Models/test.json"
  import Item from "../Models/Item"
  import { ProductionListItem } from "../Models/ProductionList"
  import { Network } from "vis-network/standalone/esm/vis-network.min"
  import * as vis from "vis-network/standalone/esm/vis-network.min"

  const { productionItems } = storeToRefs(useProductionListStore())

  const recipes: Production[] = production.products.map(product => new Production(product))
  const products: any = computed(() => {
    const nodes = []
    productionItems.value.forEach(productItem => {
      if (productItem.Name != "") {
        // Add node, using recipe, production item.
        addNode(productItem, nodes)
      }
    })

    return nodes
  })

  onMounted(() => {
    initializeNetwork()
    updateNetwork()
  })

  watch(productionItems.value, () => {
    updateNetwork()
  })

  function getProductRecipe(productName: string) {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes.at(i)?.Product == productName) {
        return recipes.at(i)
      }
    }
  }

  function addNode(item: ProductionListItem, nodes) {
    const node = getNode(item, nodes)
    if (node) {
      // Update quantities.
      node.Total = parseInt(node.Total) + parseInt(item.ItemsPerMinute)
    } else {
      // Adds nodes.
      nodes.push({
        Total: item.ItemsPerMinute,
        Name: item.Name,
      })
    }
  }

  function getNode(item: Item, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes.at(i)?.Name === item.Name) {
        return nodes.at(i)
      }
    }
    return null
  }

  const networkElement = ref<HTMLElement>(null)
  let network
  function initializeNetwork() {
    // Data for the network (replace with your own data)
    const nodes = new vis.DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
    ])

    const edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
    ])

    const data = { nodes, edges }

    // Options for the network (customize as needed)
    const options = {
      physics: false,
      layout: {
        hierarchical: {
          direction: "LR",
        },
      },
    }

    // Create a new network instance
    network = new Network(networkElement.value, data, options)
  }

  function updateNetwork() {
    const nodes = new vis.DataSet([])
    products.value.forEach(product => {
      const recipe = getProductRecipe(product.Name)
      const newNode = {
        id: product.Name,
        label: `${product.Name} - ${product.Total}`,
        Leve: recipe?.Level,
      }
      nodes.add(newNode)
    })
    const edges = new vis.DataSet([])
    products.value.forEach(product => {
      const recipe = getProductRecipe(product.Name)
      // I want to create edges for current product.
      const inputs = recipe?.Input
      inputs?.forEach(input => {
        const newEdge = {
          to: input.Product,
          from: product.Name,
        }
        edges.add(newEdge)
      })
    })
    // Update the network with the modified data
    const updatedData = {
      nodes: nodes,
      edges: edges,
    }

    network.setData(updatedData)
  }
</script>

<style lang="scss" scoped></style>
