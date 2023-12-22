<template>
  <div class="options-section">
    <div class="options-section__container">
      <div class="options-section__item">
        <div class="options-section_item-label">Rank Direction</div>
        <v-select v-model="networkLayout.rankDir" hide-details density="compact" :suffix="`Default: ${defaultLayoutOptions.rankDir}`" :items="rankDirOptions" variant="solo-filled" />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Node Separation</div>
        <v-text-field
          v-model="networkLayout.nodeSep"
          hide-details
          variant="outlined"
          class="options-section__number-input"
          label="Enter a number"
          type="number"
          step="1"
          density="compact"
          outlined
          :suffix="`Default: ${defaultLayoutOptions.nodeSep}`"
        />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Edge Separation</div>
        <v-text-field
          v-model="networkLayout.edgeSep"
          hide-details
          variant="outlined"
          class="options-section__number-input"
          label="Enter a number"
          type="number"
          step="1"
          density="compact"
          outlined
          :suffix="`Default: ${defaultLayoutOptions.edgeSep}`"
        />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Rank Separation</div>
        <v-text-field
          v-model="networkLayout.rankSep"
          hide-details
          variant="outlined"
          class="options-section__number-input"
          label="Enter a number"
          type="number"
          step="1"
          density="compact"
          outlined
          :suffix="`Default: ${defaultLayoutOptions.rankSep}`"
        />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Alignment</div>
        <v-select v-model="networkLayout.align" hide-details density="compact" :suffix="`Default: ${defaultLayoutOptions.align}`" :items="alignmentOptions" variant="solo-filled" />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Ranker</div>
        <v-select v-model="networkLayout.ranker" hide-details density="compact" :suffix="`Default: ${defaultLayoutOptions.ranker}`" :items="rankerOptions" variant="solo-filled" />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Spacing Factor</div>
        <v-text-field
          v-model="networkLayout.spacingFactor"
          hide-details
          variant="outlined"
          class="options-section__number-input"
          label="Enter a number"
          type="number"
          step="1"
          density="compact"
          outlined
          :suffix="`Default: ${defaultLayoutOptions.spacingFactor}`"
        />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Fit network on updates</div>
        <v-checkbox v-model="networkLayout.fit" hide-details />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Node dimensions include labels</div>
        <v-checkbox v-model="networkLayout.nodeDimensionsIncludeLabels" hide-details />
      </div>
      <div class="options-section__item">
        <div class="options-section_item-label">Edge Curve Style</div>
        <v-select v-model="networkStyle.curveStyle" hide-details density="compact" :suffix="`Default: ${defaultStyleOptions.curveStyle}`" :items="curveStyleOptions" variant="solo-filled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { rankDirOptions, defaultLayoutOptions, alignmentOptions, rankerOptions } from "../Models/NetworkLayoutOptions"
  import { defaultStyleOptions, curveStyleOptions } from "../Models/NetworkStyleOptions"

  import { useNetworkOptions } from "../Stores/networkOptions"
  import { toRefs } from "vue"

  const { networkLayout, networkStyle } = toRefs(useNetworkOptions())
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
