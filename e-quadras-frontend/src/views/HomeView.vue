<script setup lang="ts">
import { CLIENT_COMPANY_NAME } from '@/utils/constants/clientVariables'
import { URL_GET_SPORTS_COURTS, URL_GET_AVAILABLE_SCHEDULES, URL_POST_SCHEDULE_APPOINTMENT } from '@/utils/constants/urlApi'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const selectedDate = ref(undefined)
const sportsCourtsList = ref(undefined)
const selectedSportsCourtId = ref<number | undefined>(undefined)
const availableSchedules = ref(undefined)
const selectedSchedule = ref(undefined)
const name = ref('')
const phone = ref('')
const email = ref('')

const getAllSportsCourts = async () => {
  const response = await axios.get(URL_GET_SPORTS_COURTS)

  console.log('response:', response.data)
  return response.data
}

const handleSelectedSportsCourt = async () => {
  const date = new Date(selectedDate.value).toISOString()

  const response = await axios.get(URL_GET_AVAILABLE_SCHEDULES(selectedSportsCourtId.value, date))

  availableSchedules.value = response.data
}

const createScheduleAppointment = async (formData: any) => {
  const response = await axios.post(URL_POST_SCHEDULE_APPOINTMENT, formData)

  console.log('response:', response.data)
}

const handleScheduleAppointment = async () => {
  const dateTimeSchedule = () => {
    const date = new Date(selectedDate.value)
    console.log('date:', date)
    const time = selectedSchedule.value.split(':')
    time.push('00')
    console.log('time:', time)
    console.log('time[0]:', time[0])
    date.setHours(time[0], time[1], 0, 0)
    console.log('date:', date)

    console.log('date.toISOString()', date.toISOString())
    return date.toISOString()
  }

  const formData = {
    'dateTimeSchedule': dateTimeSchedule(),
    'customer': {
      'name': name.value,
      'email': email.value,
      'phone': phone.value,
    },
    'sportsCourt': selectedSportsCourtId.value,
  }

  await createScheduleAppointment(formData)
}

onMounted(async () => {
  sportsCourtsList.value = await getAllSportsCourts()
  console.log('sportsCourtsList:', sportsCourtsList.value)
})

</script>

<template>
  <v-container class="d-flex w-100 h-100 align-center bg-grey">
    <v-row class="h-100 bg-blue" no-gutters>
      <v-col cols="8" class="bg-yellow">
        <v-sheet class="bg-pink">
          <v-date-picker
            width="100%"
            height="100%"
            border="lg"
            color="primary"
            elevation="24"
            :title="CLIENT_COMPANY_NAME"
            header="Selecione o dia..."
            :allowed-dates="undefined"
            bg-color="terciary"
            :hide-header="false"
            :landscape="false"
            :multiple="false"
            show-adjacent-months
            v-model="selectedDate"
          ></v-date-picker>
        </v-sheet>
      </v-col>
      <v-col class="ma-4 bg-brown">
        <v-sheet v-if="selectedDate !== undefined" class="bg-green">
          <p>Selecione uma quadra:</p>
          <v-select
              color="primary"
              variant="underlined"
              :items="sportsCourtsList"
              item-title="name"
              item-value="id"
              label="Selecione a quadra..."
              v-model="selectedSportsCourtId"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.modality"
                ></v-list-item>
              </template>
            </v-select>

            <v-btn @click="handleSelectedSportsCourt">Clica aqui pra ver as datas</v-btn>
            <div v-if="availableSchedules !== undefined">
              <p>Horários disponíveis:</p>
              <v-row>
                <v-col
                  v-for="(schedule, index) in availableSchedules"
                  :key="index"
                  cols="4"
                >
                  <v-btn @click="selectedSchedule = schedule.timeOfDay">
                    {{ schedule.timeOfDay }}
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-text-field v-model="name">Insira seu nome</v-text-field>
            <v-text-field v-model="phone">Insira seu telefone</v-text-field>
            <v-text-field v-model="email">Insira seu e-mail</v-text-field>
            <v-btn @click="handleScheduleAppointment">Agendar</v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
