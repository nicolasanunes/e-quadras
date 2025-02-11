<script setup lang="ts">
import VActionAlert from '@/components/VActionAlert.vue';
import VProgressCircular from '@/components/VProgressCircular.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { OWNER_COMPANY_NAME, ONWNER_WEBSITE } from '@/utils/constants/onwnerVariables';
import { URL_POST_AUTH_LOGIN } from '@/utils/constants/urlApi';
import { alertMessage } from '@/utils/functions/alertMessage';
import useRequest from '@/utils/functions/connection/useRequest';
import type { AxiosResponse } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const globalStore = useGlobalStore()

const { postRequest } = useRequest()

const router = useRouter()

const email = ref<string | undefined>(undefined)
const password = ref<string | undefined>(undefined)
const visible = ref<boolean>(false)

const handleLogin = async (email: string, password: string) => {
  const response: AxiosResponse | undefined = await postRequest(
    URL_POST_AUTH_LOGIN,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } },
  )

  if (response) {
    localStorage.setItem('token', response.data.accessToken)

    globalStore.isAuthenticated = true

    alertMessage('Login realizado com sucesso!')

    router.push({ path: '/admin' })
  }
}
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
              <v-btn v-if="!globalStore.loading" rounded="pill" class="w-100 gradient-background" @click="handleLogin(email, password)">Entrar</v-btn>
              <v-btn v-if="globalStore.loading" class="w-100 gradient-background">
                <VProgressCircular />
              </v-btn>
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
  <VActionAlert v-if="globalStore.alert.isActive" :text="globalStore.alert.text" :type="globalStore.alert.type" />
</template>

<style>
/* Gradiente entre as cores terciary e quaternary */
.gradient-background {
  background: linear-gradient(45deg, #03C988, #1C82AD);
}
</style>