<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
import { URL_POST_SPORTS_COURT } from '@/utils/constants/urlApi'
import { alertMessage } from '@/utils/functions/alertMessage'
import useRequest from '@/utils/functions/connection/useRequest'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'

const globalStore = useGlobalStore()

const { postRequest } = useRequest()

const modalities: string[] = [
  'Basquete',
  'Beach tennis',
  'Futebol de campo',
  'Futevôlei',
  'Futsal',
  'Peteca',
  'Society',
  'Tênis',
  'Vôlei de areia',
  'Vôlei de quadra',
]

const sportsCourtName = ref<string | undefined>(undefined)
const sportsCourtPrice = ref<number | undefined>(undefined)
const sportsCourtModality = ref<string | undefined>(undefined)
const sportsCourtLocationStreet = ref<string | undefined>(undefined)
const sportsCourtLocationNumberAddress = ref<number | undefined>(undefined)
const sportsCourtLocationNeighborhood = ref<string | undefined>(undefined)
const sportsCourtLocationCity = ref<string | undefined>(undefined)
const sportsCourtLocationState = ref<string | undefined>(undefined)
const sportsCourtLocationCEP = ref<string | undefined>(undefined)
const sportsCourtDaysOfWeek = ref<number[] | undefined>(undefined)
const sportsCourtTimesOfDay = ref<number[] | undefined>(undefined)

const location = [
  {
    text: 'Rua',
    type: 'text',
    placeholder: 'Rua',
    vModel: sportsCourtLocationStreet,
  },
  { text: 'Número', type: 'number', placeholder: '1234', vModel: sportsCourtLocationNumberAddress },
  { text: 'Bairro', type: 'text', placeholder: 'Bairro', vModel: sportsCourtLocationNeighborhood },
  { text: 'Cidade', type: 'text', placeholder: 'Cidade', vModel: sportsCourtLocationCity },
  { text: 'Estado', type: 'text', placeholder: 'Estado', vModel: sportsCourtLocationState },
  { text: 'CEP', type: 'text', placeholder: '00000-000', vModel: sportsCourtLocationCEP },
]

const daysOfWeek = [
  { label: 'Domingo', value: 1 },
  { label: 'Segunda-feira', value: 2 },
  { label: 'Terça-feira', value: 3 },
  { label: 'Quarta-feira', value: 4 },
  { label: 'Quinta-feira', value: 5 },
  { label: 'Sexta-feira', value: 6 },
  { label: 'Sábado', value: 7 },
]

const timesOfDay = [
  { label: '00', value: 1 },
  { label: '01', value: 2 },
  { label: '02', value: 3 },
  { label: '03', value: 4 },
  { label: '04', value: 5 },
  { label: '05', value: 6 },
  { label: '06', value: 7 },
  { label: '07', value: 8 },
  { label: '08', value: 9 },
  { label: '09', value: 10 },
  { label: '10', value: 11 },
  { label: '11', value: 12 },
  { label: '12', value: 13 },
  { label: '13', value: 14 },
  { label: '14', value: 15 },
  { label: '15', value: 16 },
  { label: '16', value: 17 },
  { label: '17', value: 18 },
  { label: '18', value: 19 },
  { label: '19', value: 20 },
  { label: '20', value: 21 },
  { label: '21', value: 22 },
  { label: '22', value: 23 },
  { label: '23', value: 24 },
]

const handleCreateSportsCourt = async () => {
  const data = {
    name: sportsCourtName.value,
    price: Number(sportsCourtPrice.value),
    location: {
      numberAddress: Number(sportsCourtLocationNumberAddress.value),
      street: sportsCourtLocationStreet.value,
      neighborhood: sportsCourtLocationNeighborhood.value,
      city: sportsCourtLocationCity.value,
      state: sportsCourtLocationState.value,
      cep: sportsCourtLocationCEP.value,
    },
    modality: sportsCourtModality.value,
    daysOfWeek: sportsCourtDaysOfWeek.value,
    timesOfDay: sportsCourtTimesOfDay.value,
  }

  const response: AxiosResponse | undefined = await postRequest(
    URL_POST_SPORTS_COURT,
    data,
    {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    }
  )

  if (response) {
    alertMessage('Quadra criada com sucesso!')
  }
}
</script>

<template>
  <v-dialog width="720px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="quaternary" text="Criar Quadra" class="mr-2"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card tile>
        <v-progress-linear model-value="100" color="info" :height="10"></v-progress-linear>
        <div>
          <div>
            <v-card-title><h3 class="font-weight-regular">CRIAR QUADRA</h3></v-card-title>

            <v-progress-linear model-value="100" color="terciary" :height="1"></v-progress-linear>

            <v-card-text class="text-body-1">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p><strong>Nome da quadra:</strong></p>
                  <v-text-field
                    hide-details
                    type="text"
                    density="compact"
                    variant="underlined"
                    placeholder="Nome da quadra"
                    color="terciary"
                    base-color="quaternary"
                    width="292"
                    v-model="sportsCourtName"
                  ></v-text-field>
                </div>
                <div>
                  <p><strong>Preço:</strong></p>
                  <v-text-field
                    hide-details
                    type="number"
                    density="compact"
                    variant="underlined"
                    placeholder="00"
                    color="terciary"
                    base-color="quaternary"
                    width="213"
                    v-model="sportsCourtPrice"
                    >R$:
                  </v-text-field>
                </div>
              </div>
            </v-card-text>

            <v-progress-linear model-value="100" color="terciary" :height="1"></v-progress-linear>

            <v-card-text class="text-body-1 pb-7">
              <p class="pb-2"><strong>Localização:</strong></p>
              <v-row>
                <v-col
                  cols="4"
                  class="pa-0 pl-3 pt-2"
                  v-for="(loc, index) in location"
                  :key="index"
                >
                  <div class="d-flex align-end">
                    <p class="">{{ loc.text }}:</p>
                    <v-text-field
                      class="pl-2 pr-3"
                      hide-details
                      :type="loc.type"
                      density="compact"
                      variant="underlined"
                      :placeholder="loc.placeholder"
                      color="terciary"
                      base-color="quaternary"
                      v-model="loc.vModel.value"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-progress-linear model-value="100" color="terciary" :height="1"></v-progress-linear>

            <v-card-text class="text-body-1 pb-5">
              <p class="pb-2"><strong>Modalidades:</strong></p>
              <v-row>
                <v-col
                  cols="3"
                  class="pa-0 pl-2"
                  v-for="(modality, index) in modalities"
                  :key="index"
                >
                  <v-checkbox
                    v-model="sportsCourtModality"
                    type="string"
                    color="terciary"
                    base-color="quaternary"
                    density="compact"
                    :label="modality"
                    :value="modality"
                    multiple
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>

            <v-progress-linear model-value="100" color="terciary" :height="1"></v-progress-linear>

            <v-card-text class="text-body-1 pb-5">
              <p class="pb-2"><strong>Dias da semana de funcionamento padrão:</strong></p>
              <v-row>
                <v-col cols="3" class="pa-0 pl-2" v-for="(day, index) in daysOfWeek" :key="index">
                  <v-checkbox
                    v-model="sportsCourtDaysOfWeek"
                    type="string"
                    color="terciary"
                    base-color="quaternary"
                    density="compact"
                    :label="day.label"
                    :value="day.value"
                    multiple
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>

            <v-progress-linear model-value="100" color="terciary" :height="1"></v-progress-linear>

            <v-card-text class="text-body-1">
              <p class="pb-2">
                <strong
                  >Horários padrão de funcionamento para os dias da semana selecionados:</strong
                >
              </p>
              <v-row>
                <v-col cols="1" class="pa-0 pl-2" v-for="(time, index) in timesOfDay" :key="index">
                  <v-checkbox
                    v-model="sportsCourtTimesOfDay"
                    type="string"
                    color="terciary"
                    base-color="quaternary"
                    density="compact"
                    :label="time.label"
                    :value="time.value"
                    multiple
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </div>
        <v-progress-linear model-value="0" :height="2"></v-progress-linear>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancelar"
            color="info"
            variant="outlined"
            elevation="2"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            text="Criar"
            color="success"
            variant="flat"
            elevation="2"
            @click="(handleCreateSportsCourt(), (isActive.value = false))"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style></style>
