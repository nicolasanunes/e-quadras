<script setup lang="ts">
import type { AlertType } from '@/utils/types/alert.type'

defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => AlertType,
    required: true,
  },
})
</script>

<template>
  <v-alert
    class="ma-4 mb-16"
    position="fixed"
    location="bottom end"
    density="compact"
    :text="text"
    :type="type"
  >
  </v-alert>
</template>