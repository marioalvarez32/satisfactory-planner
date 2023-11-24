<template>
  <v-card elevation="5" rounded="lg" class="production-overview">
    <div id="production-overview" class="production-overview__network"></div>
  </v-card>
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
        <div class="custom-node__image"><img src="${getImageSrc(item.Name)}" /></div>
        <p class="custom-node__title">${item.Name}</p>
        <p class="custom-node__production-rate"><i class="mdi mdi-debug-step-into"></i>${item.InputRate} / min</p>
        <p class="custom-node__output-rate custom-node__output-rate${getOutputColorClass(item)}"><i class="mdi mdi-debug-step-out"></i><span class="custom-node__output-rate-value">${item.OutputRate} / min </span></p>
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
            edgeColor: 'iron',
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

  function getImageSrc(name: string){
    const imageName = name.toLowerCase().split(' ').join('-');
    const imagePath = `/src/assets/items/${imageName}_256.png`
    const imageUrl = new URL(imagePath, import.meta.url)
    return imageUrl.href
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
      color: #ff8787bf;
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
