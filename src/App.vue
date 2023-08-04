<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';

onMounted(() => {
  appWindow.onCloseRequested((event) => {
    if (event.windowLabel === 'home') {
      appWindow.hide();

      event.preventDefault();
    }
  });
});
</script>

<template>
  <RouterView />
</template>
