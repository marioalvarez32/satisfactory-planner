<template>
  <v-card elevation="5" rounded="lg" class="production-overview">
    <div class="production-overview__tab-container">
      <v-tabs v-model="selectedTab" fixed-tabs density="compact" align-tabs="center" bg-color="primary" show-arrows slider-color="teal-lighten-3">
        <v-tab value="network">Network</v-tab>
        <v-tab value="recipes">Recipes</v-tab>
      </v-tabs>
    </div>

    <v-window v-model="selectedTab">
      <v-window-item value="network"><div id="production-overview" class="production-overview__network"></div></v-window-item>
      <v-window-item value="recipes">
        <div class="production-overview__recipe-options">
          <div class="production-overview__table-wrapper">
            <RecipeTable v-model="enabledBaseRecipes" title="Base Recipes" :recipes="baseRecipeIds" />
          </div>
          <div class="production-overview__table-wrapper">
            <RecipeTable v-model="enabledAlternateRecipes" title="Alternate Recipes" :recipes="alternateRecipeIds" />
          </div>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
  import { watch, computed, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { useProductionListStore } from "../Stores/productionList"
  import { Item } from "../Models/Item"
  import { useVisualNetwork } from "../Composables/useVisualNetwork"
  import { formatNumber, getImageSrc, getItemFromId } from "../Utilities/ItemUtility"
  import colorGroupData from "../Data/itemColorGroup.json5"
  import { nextTick } from "vue"
  import { ref } from "vue"
  import ItemsData from "@/Client/Planner/Data/Items.json5"
  import RecipeTable from "./RecipeOptions/RecipeTable.vue"
  import { toRefs } from "vue"
  import { useRecipeOptionStore } from "../Stores/recipeOptions"

  const { items, getListItemById } = storeToRefs(useProductionListStore())
  const selectedTab = ref("network")

  const { initializeNetwork, updateNetwork } = useVisualNetwork("production-overview")

  const alternateRecipeIds: string[] = ItemsData.items.filter(itemData => itemData.isAlternateRecipe === true).map(itemData => itemData.Id)
  const baseRecipeIds: string[] = ItemsData.items.filter(itemData => !itemData.isAlternateRecipe).map(itemData => itemData.Id)
  const { enabledAlternateRecipes, enabledBaseRecipes } = toRefs(useRecipeOptionStore())

  onMounted(() => {
    initializeNetwork()
  })

  watch(
    items,
    () => {
      nextTick().then(() => {
        updateNetwork(nodes.value, edges.value)
      })
    },
    { deep: true }
  )

  function createNode(item: Item) {
    var htmlString = `
      <div>
          <div class="custom-node__image"><img src="${getImageSrc(item.Name)}" /></div>
          <p class="custom-node__title">${item.Name}</p>
            <div class="custom-node__details-container">
              <p class="custom-node__production-rate" title="Input Rate"><i class="mdi mdi-debug-step-into"></i>${formatNumber(item.InputRate)} / min</p>
              <p class="custom-node__output-rate custom-node__output-rate${getOutputColorClass(item)}" title="Output Rate"><i class="mdi mdi-debug-step-out"></i><span class="custom-node__output-rate-value">${formatNumber(
                item.OutputRate
              )} / min </span></p>
            </div>
          </div>`

    let div = document.createElement("div")
    div.innerHTML = htmlString
    div.classList.add("custom-node")

    return {
      data: {
        id: item.Name,
        ItemId: item.Id,
        level: item.Level,
        dom: div,
        Type: "Node",
        Name: item.AlternateName ?? item.Name,
      },
    }
  }

  function createEdge(item: Item): Array<any> {
    const listItem = getListItemById.value(item.Id)
    const itemsPerMinute = listItem?.ItemsPerMinute ?? 0
    const edges = []
    item.Input.forEach(input => {
      const inputItem = getItemFromId(input.Id)
      const ratio = input.ProductionRate / item.ProductionRate
      const newEdge = {
        data: {
          source: inputItem.Name,
          target: item.Name,
          id: `${item.Name}-${inputItem.Name}`,
          label: `${(ratio * itemsPerMinute).toFixed(2)} / min`,
          EdgeColor: colorGroupData[inputItem.Name],
          EdgeType: "Item-Relation",
        },
      }
      edges.push(newEdge)
    })

    // Add ByProduct edges.
    item.Byproduct?.forEach(byproduct => {
      const byproductRecipe = getItemFromId(byproduct.Id)
      const ratio = byproduct.ProductionRate / item.ProductionRate
      // To calculate byproduct InputRate the user input for original recipe needs to be used.
      const itemUserInput = getListItemById.value(item.Id)
      if (itemUserInput) {
        const newEdge = {
          data: {
            source: item.Name,
            target: byproductRecipe.Name,
            id: `${item.Name}-${byproductRecipe.Name}`,
            label: `${(ratio * itemUserInput.ItemsPerMinute).toFixed(2)} / min`,
            EdgeType: "Byproduct-Item",
          },
        }
        edges.push(newEdge)
      }
    })
    return edges
  }

  const nodes = computed(() => {
    return items.value?.map(item => {
      return createNode(item)
    })
  })

  const edges = computed(() => {
    return items.value
      ?.map(item => {
        return createEdge(item)
      })
      .flat()
  })

  function getOutputColorClass(item: Item) {
    if (item.OutputRate == 0) return
    const difference = item.InputRate - item.OutputRate
    if (difference >= 0) {
      return "--good"
    } else if (difference < 0) {
      return "--bad"
    } else {
      return "--warn"
    }
  }
</script>

<style lang="scss" scoped>
  .production-overview {
    grid-area: overview;
    position: relative;
  }

  .production-overview__tab-container{
    position: absolute;
    left:0;
    right:0;
    top:0;
    z-index: 1;
  }

  .production-overview__network {
    height: calc(100vh - var(--v-layout-top));
  }

  :deep(.custom-node) {
    background-color: #004ea3;
    border-radius: 15px;
    display: flex !important;
    justify-content: center;
    font-size: 12px;
    padding: 8px 10px;
    text-wrap: nowrap;
    position: relative;
    color: #f3f2f2;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

    .custom-node__image{
      width:100%;
      position:absolute; 
      left:0;
      top: -50px;
      display:flex;
      justify-content: center;
      

      img{
        height:65px;
        width:65px;
        -webkit-filter: drop-shadow(2px 2px 2px #222);
        filter: drop-shadow(2px 2px 2px #222);
      }
    }

    .custom-node__title {
      text-align: center;
      font-weight: 600;
    }

    .custom-node__details-container{
      display:flex;
      flex-direction: row;
      gap: 5px;
    }

    .custom-node__output-rate {

      span {
        font-weight: 600;
      }

      .mdi-debug-step-out::before{
        transform: rotateX(180deg);
      }
    }
    .custom-node__output-rate--good .custom-node__output-rate-value {
      color: #1abe1a;
    }

    .custom-node__output-rate--bad .custom-node__output-rate-value {
      color: rgb(221, 21, 21);
    }

    .ribbon {
      position: absolute;
      width: 2px;
      left: 5px;
      top: 5px;
      height: 6px;
      width: 6px;
      background: #3949ab;
      border-radius: 35px;
    }
  }
  .production-overview__tab-container{
    display:flex;
    justify-content: center;
    padding:10px;
  }
  .production-overview__tab-container :deep(button.v-tab){
    text-transform: capitalize;
  }

  :deep(.v-window),
  :deep(.v-window__container),
  :deep(.v-window-item) {
    height:100%;
  }

  .production-overview__recipe-options {
    margin-top: 50px;
    display:flex;
    height: calc(100% - 50px);
    justify-content: center;
  }

  .production-overview__table-wrapper{
    padding:5px;
    width: 50%;
  }
</style>
