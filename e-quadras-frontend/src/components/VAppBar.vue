<script setup lang="ts">
import { CLIENT_LOGO_PATH } from '@/utils/constants/clientVariables';
import { useRouter } from 'vue-router';

const router = useRouter()

const handleLogout = () => {
  router.push({ path: '/login' })
}
</script>

<template>
  <v-app-bar app color="terciary" elevation="12">
    <div class="h-75 align-center ml-16">
      <router-link to="/" class="">
        <img
          class="h-100 w-auto"
          :src="CLIENT_LOGO_PATH"
          alt="logo"
        />
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="mr-2">
      <v-btn icon="mdi-logout" variant="plain" color="primary" @click="handleLogout()"></v-btn>
    </div>
  </v-app-bar>
</template>

<style></style>