
<script setup>

import { ref } from 'vue';

import AppToolbar from './shared/presentation/components/app-toolbar.vue';

import AppSidebar from './shared/presentation/components/app-sidebar.vue';



const isSidebarVisible = ref(false);



const toggleSidebar = () => {

 isSidebarVisible.value = !isSidebarVisible.value;

};

</script>



<template>

 <div id="app" class="min-h-screen surface-ground flex flex-column">

  <pv-toast position="top-right" />

  <app-toolbar @toggle-sidebar="toggleSidebar" />

  <app-sidebar v-model:visible="isSidebarVisible" />

  <main class="flex-grow-1 p-4" role="main">

   <router-view />

  </main>

 </div>

</template>



<style>

body {

 margin: 0;

 font-family: var(--p-font-family, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif);

 background-color: #f8fafc;

 color: #1e293b;

}

</style>

