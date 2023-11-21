<template>
  <div class="production-overview">
    Production Overview
    <div id="cy" class="production-overview__network"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from "vue"
  import { storeToRefs } from "pinia"
  import { useProductionListStore } from "../Stores/productionList"
  import { Production } from "../Models/Production"
  import production from "../Models/test.json"
  import Item from "../Models/Item"
  import { ProductionListItem } from "../Models/ProductionList"
  import cytoscape from "cytoscape"
  import cytoscapeDomNode from "cytoscape-dom-node"
  import dagre from "cytoscape-dagre"
  import cytoscapeNgraph from "cytoscape-ngraph.forcelayout"
  import { diagramStyle } from "./styles"

  cytoscape.use(cytoscapeDomNode)
  cytoscape.use(dagre)
  cytoscape.use(cytoscapeNgraph)

  const { filteredItems } = storeToRefs(useProductionListStore())
  const layoutOptions = {
    name: "dagre",
    avoidOverlap: true,
    fit: true,
    rankDir: "UL",
    idealEdgeLength: 10,
    padding: 200,
    rankSep: 125,
  }

  const recipes: Production[] = production.products.map(product => new Production(product))
  const products: any = computed(() => {
    const nodes = []
    filteredItems.value.forEach(productItem => {
      addNode(productItem, nodes)
    })

    return nodes
  })

  onMounted(() => {
    initializeNetwork()
    updateNetwork()
  })

  watch(filteredItems, () => updateNetwork(), { deep: true })

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

  let cy
  function initializeNetwork() {
    if (cy) {
      cy.destroy()
    }
    cy = cytoscape({
      container: document.getElementById("cy"), // container to render in
      elements: [],

      style: diagramStyle,
      layout: layoutOptions,
    })
    cy.domNode()
  }

  function cy_node_def(product, recipe) {
    var htmlString = `
    <div>
      <p class="custom-node__title">${product.Name}</p>
      <p class="custom-node__production-rate">${product.Total} / min</p>
    </div>`

    let id = product.Name
    let div = document.createElement("div")
    //div.innerHTML = `Item: ${product.Name}`
    div.innerHTML = htmlString
    div.classList.add("custom-node")
    div.style.height = `50px`

    return {
      data: {
        id: id,
        dom: div,
      },
    }
  }

  function updateNetwork() {
    initializeNetwork()

    const nodes = []
    products.value.forEach(product => {
      const recipe = getProductRecipe(product.Name)
      const newNode = cy_node_def(product, recipe)
      nodes.push(newNode)
    })

    // Update the network with the modified data
    cy.add(nodes)

    const edges = []
    products.value.forEach(product => {
      const recipe = getProductRecipe(product.Name)
      // I want to create edges for current product.
      const inputs = recipe?.Input
      inputs?.forEach(input => {
        const ratio = input.ProductionRate / (recipe ? recipe.ProductionRate : 1)
        const newEdge = {
          data: {
            source: input.Product,
            target: product.Name,
            id: `${product.Name}-${input.Product}`,
            label: `${ratio * product.Total} / min`,
          },
        }
        if (cy.$id(input.Product).length > 0) {
          edges.push(newEdge)
        }
      })
    })

    cy.add(edges)

    cy.layout(layoutOptions).run()
  }

  function getNodeLabel(product, recipe) {
    return "<b>Node 1</b><br/>Additional Info 1<br/>More Info 1"
  }
</script>

<style lang="scss" scoped>
  .production-overview {
    grid-area: overview;
  }

  .production-overview__network {
    height: calc(100vh - var(--v-layout-top));
  }

  :deep(.custom-node) {
    background-color: #bbbbbb;
    border-radius: 8px;
    display: flex !important;
    justify-content: center;
    font-size: 12px;
    padding: 8px 10px;
    text-wrap: nowrap;

    .custom-node__title {
      text-align: center;
      font-weight: 600;
    }

    .custom-node__production-rate {
      text-align: center;
    }
  }
</style>
