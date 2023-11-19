<template>
  <v-app>
    <v-layout full-height>
      <NavigationBar />
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
  import NavigationBar from "@/Client/NavigationBar.vue"
</script>

<style lang="scss" scoped>
  html,
  body {
    height: 100%;
  }
</style>
