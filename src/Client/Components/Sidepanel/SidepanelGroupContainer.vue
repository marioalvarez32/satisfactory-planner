<template>
  <div class="sidepanel-group-item">
    <div class="sidepanel-group-item__title-container">
      <span class="line"></span>
      <span class="title">{{ title }}</span>
      <span class="line"></span>
    </div>
    <div class="sidepanel-group-item__content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .sidepanel-group-item__title-container {
  display: flex;
  align-items: center;
}

.line {
  flex-grow: 1;
  height: 1px;
  background-color: #dcdcdc;
}

.title {
  padding: 0 10px;
  white-space: nowrap;
}

.sidepanel-group-item__content-container{
  padding: 10px;
}
</style>
