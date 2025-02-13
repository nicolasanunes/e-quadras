const SERVER_IP = 'http://192.168.10.19:3000'

// Auth
export const URL_POST_AUTH_LOGIN = `${SERVER_IP}/auth`

// SportsCourt
export const URL_POST_SPORTS_COURT = `${SERVER_IP}/sports-court`
export const URL_GET_ALL_SPORTS_COURTS = `${SERVER_IP}/sports-court`
export const URL_DELETE_SPORTS_COURT_BY_ID = (id: number) => `${SERVER_IP}/sports-court/${id}`

export const URL_GET_AVAILABLE_SCHEDULES = (id: number, selectedDate: Date) =>
  `${SERVER_IP}/sports-court/available-schedule/${id}/${selectedDate}`
export const URL_POST_SCHEDULE_APPOINTMENT = `${SERVER_IP}/schedule-appointment`
export const URL_GET_ALL_UPCOMING_SCHEDULE_APPOINTMENTS = `${SERVER_IP}/schedule-appointment/upcoming`
export const URL_DELETE_SCHEDULE_APPOINTMENT_BY_ID = (id: number) =>
  `${SERVER_IP}/schedule-appointment/${id}`
