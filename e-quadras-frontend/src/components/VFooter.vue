<script setup lang="ts">
import { CURRENT_YEAR, ONWNER_WEBSITE, OWNER_COMPANY_NAME, OWNER_INSTAGRAM_LINK } from '@/utils/constants/onwnerVariables';
</script>

<template>
  <v-footer app color="quaternary" elevation="12" class="d-flex justify-space-between align-center">
    <div></div>
    <div class="text-center ml-6">
      <p>{{ CURRENT_YEAR }} - <strong><a :href="ONWNER_WEBSITE" target="_blank" class="text-decoration-none text-black">{{ OWNER_COMPANY_NAME }}</a></strong></p>
    </div>
    <div>
      <v-btn variant="plain" icon="mdi-instagram" density="compact" :href="OWNER_INSTAGRAM_LINK" target="_blank"></v-btn>
    </div>
  </v-footer>
</template>

<style></style>