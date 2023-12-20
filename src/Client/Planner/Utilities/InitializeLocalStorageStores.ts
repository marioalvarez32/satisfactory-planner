import { Ref, toRefs, watch } from 'vue';
import { SavedUserTabData } from '../Models/SavedUserTabData';
import { useStorage } from '@vueuse/core';
import { useNetworkDataStore } from '../Stores/networkData';
import { NetworkLayoutOptions, defaultLayoutOptions } from '../Models/NetworkLayoutOptions';
import { useVisualNetwork } from '../Composables/useVisualNetwork';
import { useNetworkOptions } from '../Stores/networkOptions';
import { NetworkStyleOptions, defaultStyleOptions } from '../Models/NetworkStyleOptions';

export function syncLocalStorageData(): void {
  syncNetworkUserData();
  syncNetworkLayoutData();
  syncNetworkStyleData();
}

function syncNetworkUserData(): void {
  const { savedUserTabData } = toRefs(useNetworkDataStore());

  const storedItems: Ref<SavedUserTabData[]> = useStorage('production-list-chart-user-data', [], localStorage, { mergeDefaults: true });
  if (storedItems.value && storedItems.value.length > 0) {
    savedUserTabData.value = storedItems.value;
  }

  watch(
    savedUserTabData,
    () => {
      storedItems.value = savedUserTabData.value;
    },
    { deep: true }
  );
}

function syncNetworkLayoutData(): void {
  const storedLayoutOptions: Ref<NetworkLayoutOptions> = useStorage('network-layout-options', defaultLayoutOptions, localStorage, { mergeDefaults: true });

  const { networkLayout } = toRefs(useNetworkOptions());
  const { updateNetworkLayout } = useVisualNetwork();

  watch(
    networkLayout.value,
    () => {
      storedLayoutOptions.value = networkLayout.value;
      updateNetworkLayout();
    },
    { immediate: true }
  );
}

function syncNetworkStyleData(): void {
  const storedStyleOptions: Ref<NetworkStyleOptions> = useStorage('network-style-options', defaultStyleOptions, localStorage, { mergeDefaults: true });

  const { networkStyle } = toRefs(useNetworkOptions());
  const { updateNetworkStyle } = useVisualNetwork();

  watch(
    networkStyle.value,
    () => {
      storedStyleOptions.value = networkStyle.value;
      updateNetworkStyle();
    },
    { immediate: true }
  );
}
