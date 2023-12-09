<template>
  <div class="options">
    General Options
    <ProductionNetworkLayoutOptions />
  </div>
</template>

<script setup lang="ts">
  import ProductionNetworkLayoutOptions from "./ProductionNetworkLayoutOptions.vue"
</script>

<style lang="scss" scoped>
  .options-section {
    display:flex;
    justify-content: center;
    flex-direction: column;
    border-bottom:1px solid #535353;
    padding:25px 50px;
    gap: 10px;
   }
   .options-section__container{
    display:flex; 
    gap: 10px;
    flex-direction: column;
   }
   .options-section__item{
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
   }
   .options-section__title{
    display:flex;
    align-items: center;
    justify-content: center;
   }
</style>
