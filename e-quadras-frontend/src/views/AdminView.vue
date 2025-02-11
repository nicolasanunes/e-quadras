<script setup lang="ts">
import { URL_GET_ALL_SCHEDULE_APPOINTMENTS } from '@/utils/constants/urlApi';
import useRequest from '@/utils/functions/connection/useRequest';
import { formatDate } from '@/utils/functions/formatDate';
import type { ScheduleAppointmentInterface } from '@/utils/interfaces/scheduleAppointment.interface';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';

const { getRequest } = useRequest()

const scheduleAppointments = ref<ScheduleAppointmentInterface[] | undefined>(undefined)

const getAllScheduleAppointments = async (): Promise <ScheduleAppointmentInterface[] | undefined> => {
  const response: AxiosResponse | undefined = await getRequest(URL_GET_ALL_SCHEDULE_APPOINTMENTS)

  if (response) {
    return response.data as ScheduleAppointmentInterface[]
  }
}

onMounted(async () => {
  scheduleAppointments.value = await getAllScheduleAppointments()
  console.log(scheduleAppointments.value)
})
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height pa-2" no-gutters>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8" class="pr-0 pr-md-6 pb-md-6">
        <v-sheet elevation="12" class="rounded mb-6 pa-4 h-50">
          <div class="d-flex justify-center align-center flex-column">
            <v-avatar image="../../../public/logo.png" border="lg" color="quaternary" size="120"></v-avatar>
            <h2>Nome da empresa</h2>
        </div>
        </v-sheet>

        <v-sheet elevation="12" class="rounded pa-4 h-50">sheet 3</v-sheet>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-12 pt-md-0">
        <v-sheet elevation="12" class="rounded pa-4 h-100">
          <v-card v-for="appointment in scheduleAppointments" :key="appointment.id" class="mb-4">
            <p>{{ formatDate(appointment.dateTimeSchedule) }}</p>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style> 