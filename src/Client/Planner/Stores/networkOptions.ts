import { defineStore } from 'pinia';
import { NetworkLayoutOptions, defaultLayoutOptions } from '../Models/NetworkLayoutOptions';
import { Ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { NetworkStyleOptions, defaultStyleOptions } from '../Models/NetworkStyleOptions';

const storedLayoutOptions: Ref<NetworkLayoutOptions> = useStorage('network-layout-options', defaultLayoutOptions, localStorage, { mergeDefaults: true });
const storedStyleOptions: Ref<NetworkStyleOptions> = useStorage('network-style-options', defaultStyleOptions, localStorage, { mergeDefaults: true });

type State = {
  networkLayout: NetworkLayoutOptions;
  networkStyle: NetworkStyleOptions;
};

export const useNetworkOptions = defineStore('network-options-store', {
  state: (): State => ({
    networkLayout: storedLayoutOptions.value,
    networkStyle: storedStyleOptions.value,
  }),
});
