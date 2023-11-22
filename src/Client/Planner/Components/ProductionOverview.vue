<template>
  <div class="production-overview">
    <div id="production-overview" class="production-overview__network"></div>
  </div>
</template>

<script setup lang="ts">
  import { watch, computed, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { useProductionListStore } from "../Stores/productionList"
  import { Item } from "../Models/Item"
  import itemData from "../Data/items.json"
  import { useVisualNetwork } from "../Composables/useVisualNetwork"

  const { productionListItems, items } = storeToRefs(useProductionListStore())

  const { initializeNetwork, updateNetwork } = useVisualNetwork("production-overview")
  onMounted(() => { 
    initializeNetwork()
    updateNetwork(nodes.value, edges.value);
  })

  watch(items, () =>{
    updateNetwork(nodes.value, edges.value)
  }, { deep: true })

  function createNode(item: Item) {
    var htmlString = `
    <div>
        <p class="custom-node__title">${item.Name}</p>
        <p class="custom-node__production-rate">${item.InputRate} / min</p>
        <p class="custom-node__output-rate custom-node__output-rate${getOutputColorClass(item)}"><span>Output:</span> <span class="custom-node__output-rate-value">${item.OutputRate} / min </span></p>
    </div>`

    let div = document.createElement("div")
    //div.innerHTML = `Item: ${product.Name}`
    div.innerHTML = htmlString
    div.classList.add("custom-node")
    div.style.height = `65px`

    return {
      data: {
        id: item.Name,
        dom: div,
      },
    }
  }

  function createEdge(item: Item): Array<any>{
    const edges = [];
      item.Input.forEach(input => {
        const ratio = input.ProductionRate / item.ProductionRate;
        const newEdge = {
          data: {
            source: input.Name,
            target: item.Name,
            id: `${item.Name}-${input.Name}`,
            label: `${ratio * item.InputRate} / min`,
          },
        }
        edges.push(newEdge);
    })
    return edges;
  }

  const nodes = computed(()=>{
    return items.value.map((item)=>{
      return createNode(item);
    });
  }); 

  const edges = computed(()=>{
    return items.value.map((item)=>{
      return createEdge(item);
    }).flat();
  }); 

  function getOutputColorClass(item: Item){
    if (item.OutputRate == 0) return;
    const difference = item.InputRate - item.OutputRate;
    if(difference > 0){
      return '--good';
    } else if (difference < 0){
      return '--bad'
    } else {
      return '--warn'
    }
  }

</script>

<style lang="scss" scoped>
  .production-overview {
    grid-area: overview;
    border:1px solid red;
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
    position: relative;

    .custom-node__title {
      text-align: center;
      font-weight: 600;
    }

    .custom-node__production-rate {
      text-align: center;
    }

    .custom-node__output-rate {

      span {
        font-weight: 600;
      }
    }
    .custom-node__output-rate--good .custom-node__output-rate-value {
      color: #028702;
    }

    .custom-node__output-rate--bad .custom-node__output-rate-value {
      color: #cf0404;
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
</style>
