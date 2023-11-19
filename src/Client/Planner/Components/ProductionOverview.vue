<template>
  Production Overview
  <div v-for="(item, index) in nodes" :key="index">{{ item.Name }} X {{ item.Total }}</div>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue"
  import { storeToRefs } from "pinia"
  import { useProductionListStore } from "../Stores/productionList"
  import { Production } from "../Models/Production"

  import production from "../Models/test.json"
  import Item from "../Models/Item"
  import { ProductionListItem } from "../Models/ProductionList"

  const { productionItems } = storeToRefs(useProductionListStore())

  const recipes: Production[] = production.products.map(product => new Production(product))
  const nodes: any = computed(() => {
    const nodes = []
    productionItems.value.forEach(productItem => {
      if (productItem.Name.Name != "") {
        const recipe = getProductRecipe(productItem.Name)
        // Add node, using recipe, production item.
        addNode(productItem, nodes)
      }
    })

    return nodes
  })

  function getProductRecipe(product: Item) {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes.at(i)?.Product.Name == product.Name) {
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
      console.log("test", nodes.at(i)?.Name, item.Name)
      if (nodes.at(i)?.Name === item.Name) {
        return nodes.at(i)
      }
    }
    return null
  }
</script>

<style lang="scss" scoped></style>
