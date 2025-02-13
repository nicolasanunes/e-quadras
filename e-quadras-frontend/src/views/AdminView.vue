<script setup lang="ts">
import VActionAlert from '@/components/VActionAlert.vue'
import VDialogConfirmDelete from '@/components/VDialogConfirmDelete.vue'
import VDialogCreateSportsCourt from '@/components/VDialogCreateSportsCourt.vue'
import { useGlobalStore } from '@/stores/globalStore'
import {
  URL_DELETE_SCHEDULE_APPOINTMENT_BY_ID,
  URL_GET_ALL_UPCOMING_SCHEDULE_APPOINTMENTS,
  URL_GET_ALL_SPORTS_COURTS,
  URL_DELETE_SPORTS_COURT_BY_ID,
} from '@/utils/constants/urlApi'
import { alertMessage } from '@/utils/functions/alertMessage'
import useRequest from '@/utils/functions/connection/useRequest'
import { formatDate } from '@/utils/functions/formatDate'
import type { ScheduleAppointmentInterface } from '@/utils/interfaces/scheduleAppointment.interface'
import type { SportsCourtInterface } from '@/utils/interfaces/sportsCourt.interface'
import type { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'

const globalStore = useGlobalStore()

const { getRequest, deleteRequest } = useRequest()

const sportsCourts = ref<SportsCourtInterface[] | undefined>(undefined)
const upcomingScheduleAppointments = ref<ScheduleAppointmentInterface[] | undefined>(undefined)

const vDialogConfirmDeleteModel = ref<boolean>(false)

const handleDeleteSportsCourt = async (id: number): Promise<void> => {
  const response: AxiosResponse | undefined = await deleteRequest(
    URL_DELETE_SPORTS_COURT_BY_ID(id),
    {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    },
  )

  if (response) {
    alertMessage('Quadra excluída com sucesso!')
  }
}

const handleDeleteScheduleAppointment = async (id: number): Promise<void> => {
  const response: AxiosResponse | undefined = await deleteRequest(
    URL_DELETE_SCHEDULE_APPOINTMENT_BY_ID(id),
    {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    },
  )

  if (response) {
    alertMessage('Agendamento excluído com sucesso!')
  }
}

const getAllSportsCourts = async (): Promise<SportsCourtInterface[] | undefined> => {
  const response: AxiosResponse | undefined = await getRequest(URL_GET_ALL_SPORTS_COURTS)

  if (response) {
    return response.data as SportsCourtInterface[]
  }
}

const getAllUpcomingScheduleAppointments = async (): Promise<
  ScheduleAppointmentInterface[] | undefined
> => {
  const response: AxiosResponse | undefined = await getRequest(
    URL_GET_ALL_UPCOMING_SCHEDULE_APPOINTMENTS,
    {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    },
  )

  if (response) {
    return response.data as ScheduleAppointmentInterface[]
  }
}

onMounted(async () => {
  sportsCourts.value = await getAllSportsCourts()
  upcomingScheduleAppointments.value = await getAllUpcomingScheduleAppointments()
})
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height pa-2" no-gutters>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8" class="pr-0 pr-md-6">
        <v-sheet elevation="12" height="36.3vh" class="rounded mb-6 pa-4">
          <div class="d-flex justify-center align-center flex-column">
            <v-avatar
              image="../../../public/logo.png"
              border="lg"
              color="quaternary"
              size="120"
            ></v-avatar>
            <h2>Nome da empresa</h2>
          </div>
        </v-sheet>

        <v-sheet elevation="12" height="44.2vh" class="rounded pa-4 overflow-y-auto">
          <div
            class="d-flex justify-space-between align-center rounded-t py-2 mb-2 gradient-background"
          >
            <div></div>
            <div></div>
            <div></div>
            <h3 class="font-weight-regular mr-8">QUADRAS</h3>
            <div></div>
            <VDialogCreateSportsCourt />
          </div>
          <v-card
            v-for="sportsCourt in sportsCourts"
            :key="sportsCourt.id"
            density="compact"
            color="#FAFAFA"
            variant="elevated"
            tile
            class="mb-2"
          >
            <v-card-title class="d-flex justify-space-between align-center bg-quaternary py-0 pr-1">
              {{ sportsCourt.name }}
              <VDialogConfirmDelete
                text="Tem certeza de que você deseja excluir esta quadra?"
                @click="vDialogConfirmDeleteModel = true"
                @confirmDelete="handleDeleteSportsCourt(sportsCourt.id)"
              />
            </v-card-title>
            <v-card-subtitle class="mt-1">{{ sportsCourt.modality }}</v-card-subtitle>
            <v-card-text>
              <strong>Dias:</strong>
              {{ sportsCourt.daysOfWeek.map((day) => day.dayName).join(', ') }} <br />
              <strong>Horários:</strong>
              {{ sportsCourt.timesOfDay.map((hour) => hour.dayHour).join(', ') }} <br />
              <strong>Preço:</strong> {{ sportsCourt.price }} <br />
              <strong>Localização:</strong> {{ sportsCourt.location.street }}.
              {{ sportsCourt.location.numberAddress }}. {{ sportsCourt.location.neighborhood }}.
              {{ sportsCourt.location.city }}. {{ sportsCourt.location.state }}. CEP:
              {{ sportsCourt.location.cep }}
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-6 pt-md-0">
        <v-sheet elevation="12" height="83.1vh" class="rounded pa-4 overflow-y-auto">
          <h3 class="font-weight-regular text-center py-2 mb-2 gradient-background rounded-t">
            PRÓXIMOS AGENDAMENTOS
          </h3>
          <v-card
            v-for="appointment in upcomingScheduleAppointments"
            :key="appointment.id"
            density="compact"
            color="#FAFAFA"
            variant="elevated"
            tile
            class="mb-2"
          >
            <v-card-title class="d-flex justify-space-between align-center bg-terciary py-0 pr-1">
              {{ formatDate(appointment.dateTimeSchedule) }}
              <VDialogConfirmDelete
                text="Tem certeza de que você deseja excluir este agendamento?"
                @click="vDialogConfirmDeleteModel = true"
                @confirmDelete="handleDeleteScheduleAppointment(appointment.id)"
              />
            </v-card-title>
            <v-card-subtitle class="mt-1">{{ appointment.sportsCourt.name }}</v-card-subtitle>
            <v-card-text>
              <strong>Nome:</strong> {{ appointment.customer.name }} <br />
              <strong>Contato:</strong> {{ appointment.customer.phone }} <br />
              <strong>Agendado em:</strong> {{ formatDate(appointment.createdAt) }}
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <VActionAlert
    v-if="globalStore.alert.isActive"
    :text="globalStore.alert.text"
    :type="globalStore.alert.type"
  />
</template>

<style>
/* Gradiente entre as cores terciary e quaternary */
.gradient-background {
  background: linear-gradient(45deg, #03c988, #1c82ad);
}
</style>
