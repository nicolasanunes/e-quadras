<script setup lang="ts">
import { OWNER_COMPANY_NAME, ONWNER_WEBSITE } from '@/utils/constants/onwnerVariables';
import { ref } from 'vue';

const email = ref(undefined)
const password = ref(undefined)
const visible = ref<boolean>(false)
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="h-50 justify-center" no-gutters>
        <v-col cols="12" sm="6" md="5" lg="4" xl="3">
          <v-sheet elevation="12" class="d-flex flex-column fill-height rounded-s justify-center align-center px-16">
            <v-form @submit.prevent class="w-100">
              <h1 class="font-weight-regular">Fazer login</h1>
              <br>
              <p class="text-overline"><strong>EMAIL:</strong></p>
              <v-text-field
                density="compact"
                placeholder="E-mail"
                rounded="pill"
                type="email"             
                variant="solo-filled"
                v-model="email"
              >
                <template v-slot:prepend-inner>
                  <v-icon size="lg" class="px-4">{{ 'mdi-email' }}</v-icon>
                </template>
              </v-text-field>

              <p class="text-overline"><strong>SENHA:</strong></p>
              <v-text-field
                class="password"
                density="compact"
                placeholder="Senha"
                rounded="pill"
                :type="visible ? 'text' : 'password'"
                variant="solo-filled"
                v-model="password"
              >
                <template v-slot:prepend-inner>
                  <v-icon size="lg" class="px-4">{{ 'mdi-lock' }}</v-icon>
                </template>
                <template v-slot:append-inner>
                  <v-icon
                    size="lg"
                    class="pr-4"
                    @click="visible = !visible"
                    >{{ visible ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon
                  >
                </template>
              </v-text-field>
              <v-btn rounded="pill" class="w-100 gradient-background">Entrar</v-btn>
            </v-form>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6" md="5" lg="4" xl="3" class="d-none d-sm-block">
          <v-sheet elevation="12" class="d-flex flex-column fill-height rounded-e justify-center align-center gradient-background">
            <div class="text-center">
              <v-avatar image="../../../public/icon.png" color="quaternary" size="80"></v-avatar>
              <h2 class="font-weight-regular pt-2">Bem-vindo ao <strong><a :href="ONWNER_WEBSITE" target="_blank" class="text-decoration-none text-primary">{{ OWNER_COMPANY_NAME }}</a></strong></h2>
            </div>
          </v-sheet>
        </v-col>
    </v-row>
  </v-container>
</template>

<style>
/* Gradiente entre as cores terciary e quaternary */
.gradient-background {
  background: linear-gradient(45deg, #03C988, #1C82AD);
}
</style>