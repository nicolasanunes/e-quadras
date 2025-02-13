<script setup lang="ts">
import VFooter from '@/components/VFooter.vue'
import VAppBar from '@/components/VAppBar.vue'
import { useGlobalStore } from './stores/globalStore'

const globalStore = useGlobalStore()

globalStore.initializeAuth()
</script>

<template>
  <v-app class="bg-background">
    <VAppBar v-if="$route.meta.navbar" />
    <v-main>
      <router-view />
    </v-main>
    <VFooter />
  </v-app>
</template>

<style></style>
