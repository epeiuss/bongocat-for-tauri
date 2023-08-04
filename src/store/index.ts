import { defineStore, storeToRefs } from 'pinia';
import { type windowStore } from '@/types';

export const useCatStore = defineStore(
  'cat',
  () => {
    const windowStore = ref<windowStore>({
      width: 550,
      height: 318,
      x: 0,
      y: 0
    });

    return { windowStore };
  },
  {
    persist: true
  }
);

export const getWindowStore = (label: string) => {
  switch (label) {
    case 'cat':
      return storeToRefs(useCatStore()).windowStore;
    default:
      return ref({});
  }
};
