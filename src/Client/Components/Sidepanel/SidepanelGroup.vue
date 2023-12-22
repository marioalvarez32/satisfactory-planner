<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <template #default>
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start">{{ title }}</v-col>
          <v-col cols="8" class="text-grey">
            <v-fade-transition leave-absolute>
              <span>{{ subTitle }}</span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <slot></slot>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
      default: "",
    },
  })
</script>

<style lang="scss" scoped></style>
