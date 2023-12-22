<template>
  <v-expansion-panels>
    <SidepanelGroup title="General">
      <SidepanelGroupContainer title="Import / Export">
        <div class="settings__data-options">
          <div class="settings__import-container">
            <div class="settings__import-input-container">
              <p>Import file</p>
              <v-file-input v-model="selectedImportFile" hide-details clearable label="File input (.json)" accept=".json" />
            </div>
            <v-btn :disabled="shouldDisableImportButton" color="success" variant="tonal" @click="handleImport">Import</v-btn>
          </div>
          <div class="settings__export-container">
            <p>Use the 'Export' button to quickly download and save your data. As our website relies on local storage, we recommend regularly exporting your data for safekeeping. Perfect for backups, sharing, or future use.</p>
            <v-btn color="primary" @click="handleExport">Export</v-btn>
          </div>
        </div>
      </SidepanelGroupContainer>
    </SidepanelGroup>
  </v-expansion-panels>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue"
  import SidepanelGroup from "@/Client/Components/Sidepanel/SidepanelGroup.vue"
  import SidepanelGroupContainer from "@/Client/Components/Sidepanel/SidepanelGroupContainer.vue"
  import { exportProductionData, importProductionData } from "../Services/FileService"

  const selectedImportFile = ref([])
  const shouldDisableImportButton = computed(() => selectedImportFile.value.length == 0)

  function handleImport() {
    importProductionData(selectedImportFile.value.at(0))
  }

  function handleExport() {
    exportProductionData()
  }
</script>

<style lang="scss" scoped>
  .settings__data-options{
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.settings__import-container{
    display:flex; 
    flex-direction: column;
    gap: 15px;
}

.settings__import-input-container {
    display: flex;
    align-items: center;
}

.settings__export-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px; 
}
</style>
