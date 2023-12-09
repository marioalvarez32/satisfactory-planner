import { defineStore } from 'pinia';
import { NetworkLayoutOptions, defaultLayoutOptions } from '../Models/NetworkLayoutOptions';
import { Ref } from 'vue';
import { useStorage } from '@vueuse/core';

const storedLayoutOptions: Ref<NetworkLayoutOptions> = useStorage('network-layout-options', defaultLayoutOptions, localStorage, { mergeDefaults: true });

type State = {
  networkLayout: NetworkLayoutOptions;
};
export const useNetworkOptions = defineStore('network-options-store', {
  state: (): State => ({
    networkLayout: storedLayoutOptions.value,
  }),
});
