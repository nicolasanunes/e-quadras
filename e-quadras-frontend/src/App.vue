<script setup lang="ts">
import VFooter from '@/components/VFooter.vue';
import VAppBar from '@/components/VAppBar.vue';
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
